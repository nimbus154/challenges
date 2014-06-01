var split = require("split");
var Transform = require("stream").Transform;
var PriorityQueue = require("priorityqueuejs");

process.stdin
	.pipe(split()) // split lines
	.pipe(PuzzleStream()) // parse lines into puzzle data structures
	.pipe(SolutionStream()) // solve each puzzle
	.pipe(FormatStream()) // format output
	.pipe(process.stdout); // write output to console

function PuzzleStream () { return Transformer(puzzleBuilder()); }
function SolutionStream () { return Transformer(solver()); }
function FormatStream () { return Transformer(formatter()); }

// simplify creation of transform streams
// transform - transform function
function Transformer (transform)
{
	var stream = new Transform({ "objectMode": true });
	stream._transform = transform;
	return stream;
}


// returns a transform function that builds puzzles
function puzzleBuilder ()
{
	var puzzle = [];
	var problems = null;

	return build;

	// input: line
	// output: array representing problem
	// Puzzle 1 2 3  -> [ 1, 2, 3, 4, 5, 6, 7, 8, "_" ]
	//	      4 5 6
	//	      7 8 _
	function build (line, encoding, processed)
	{
		var stream = this;

		if (problems)
		{
			var parsed = line.split(" ");
			parsed.forEach(function (val) { puzzle.push(val); });

			if (puzzle.length === 9)
			{
				stream.push(puzzle);
				puzzle = [];
			}
		}
		else
			problems = +line;

		processed();
	};
}

// returns a transform function that solves puzzles
function solver ()
{
	var goal = [ 1, 2, 3, 4, 5, 6, 7, 8, "_" ];

	return findSolution;

	// input: puzzle
	// output: solution to puzzle (array of steps)
	function findSolution (puzzle, encoding, processed)
	{
		var stream = this;

		var solution = solve(puzzle);
		// console.log("Puzzle: %j, Solution: %j", puzzle, solution);
		stream.push(solution);

		processed();
	}

	// input: puzzle
	// output: array, list of directions to move cursor to win
	function solve (initialPuzzle)
	{
		var priorityQueue = new PriorityQueue(minimumWeight);

		var puzzle = initialPuzzle.concat();
		var path = [];
		var puzzlesSeen = {};
		markSeen(puzzle);

		while (!reachedGoal(puzzle))
		{
			var moves = validMoves(puzzle);
			moves.forEach
			(
				function (move)
				{
					var newPuzzle = makeMove(move, puzzle);
					if (!seen(newPuzzle))
					{
						markSeen(newPuzzle);

						var newPath = path.concat(move);
						var weight = distanceFromGoal(newPuzzle) + newPath.length;

						priorityQueue.enq({ "puzzle": newPuzzle, "weight": weight, "path": newPath });
					}
				}
			);

			var min = priorityQueue.deq();
			puzzle = min.puzzle;
			path = min.path;
		}

		return path;

		function minimumWeight (a, b)
		{
			return b.weight - a.weight;
		}

		function seen (puzzle)
		{
			return hash(puzzle) in puzzlesSeen;
		}

		function hash (puzzle)
		{
			return JSON.stringify(puzzle);
		}

		function markSeen (puzzle)
		{
			puzzlesSeen[hash(puzzle)] = true;
		}
	}

	// compare the puzzle to goal
	// return true if puzzle has values in same position as goal
	function reachedGoal (puzzle)
	{
		return puzzle.every(matchesGoal);

		function matchesGoal (puzzleElement, index)
		{
			return puzzleElement == goal[index];
		}
	}

	// input: puzzle
	// output: list of valid moves (up, down, left, right)
	function validMoves (puzzle)
	{
		var position = getCursorPosition(puzzle);
		return [ "up", "down", "left", "right" ].filter(isValidMove.bind(null, position));

		function isValidMove (position, direction)
		{
			var newPosition = moveCursor(position, direction);
			return isInPuzzle(newPosition);

			function isInPuzzle (position)
			{
				return position >= 0 && position <= 8;
			}
		}
	}

	function getCursorPosition(puzzle)
	{
		return puzzle.indexOf("_");
	}

	// input: integer, current cursor position
	//			string, direction to move
	// output: integer, new cursor location; may be invalid
	function moveCursor (position, direction)
	{
		/*
		 * 0 1 2
		 * 3 4 5
		 * 6 7 8
		 * up: index - 3
		 * down: index + 3
		 * left: index - 1, unless index % 3 = 0
		 * right: index + 1, unless index - 2 % 3 == 0
		 */
		var moves =
		{
			"up": function (p) { return p - 3; },
			"down": function (p) { return p + 3 },
			"left": function (p) { return p % 3 === 0 ? undefined : (p - 1); },
			"right": function (p) { return (p - 2) % 3 === 0 ? undefined : (p + 1); },
		};
		return moves[direction](position);
	}


	// input: move, string direction to move
	//		  puzzle, puzzle on which to make move
	// output: new puzzle with move made
	//		or null if invalid move
	function makeMove (direction, puzzle)
	{
		var position = getCursorPosition(puzzle);
		var newPosition = moveCursor(position, direction);

		return move(position, newPosition, puzzle);

		// input:
		//		current cursor pos
		//		newPos new cursor pos
		//		puzzle - puzzle on which to perform move
		// output
		//		new puzzle, with cursor in new spot
		function move (current, newPos, puzzle)
		{
			var newPuzzle = puzzle.concat();

			var cursor = newPuzzle[current];

			newPuzzle[current] = newPuzzle[newPos];
			newPuzzle[newPos] = cursor;

			return newPuzzle;
		}
	}

	// input: puzzle
	// output: integer, weight representing how many elements are out-of-place
	function distanceFromGoal (puzzle)
	{
		return puzzle.reduce(compareToGoal, 0);

		function compareToGoal (differences, puzzleElement, index)
		{
			return puzzleElement == goal[index] ? differences : differences + 1;
		}
	}
}

function formatter ()
{
	var count = 0;

	return format;

	function format (solution, encoding, processed)
	{
		var stream = this;

		count++;
		stream.push("Case #" + count + ": " + solution.join(" ") + "\n");
		processed();
	}
}
