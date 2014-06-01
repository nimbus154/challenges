var PriorityQueue = require("priorityqueuejs");

process.stdin.setEncoding("utf8");
process.stdin.on("readable", play());

function play ()
{
	console.log("Welcome to the slide puzzle game!\nType up, down, left, or right to move the cursor.\n");

	var puzzle = generatePuzzle();
	print(puzzle);

	return function ()
	{
		var move = process.stdin.read();
		if (move)
		{
			move = move.slice(0, move.length - 1); // remove newline

			if (isKnownAction(move))
			{
				puzzle = perform(move, puzzle);
				if (reachedGoal(puzzle))
				{
					console.log("Congratulations! You solved the puzzle.");
					process.exit(0);
				}
			}
			else
				handleUnknown(move, puzzle);
		}
	}
}

var goal = [ 1, 2, 3, 4, 5, 6, 7, 8, "_" ];

function generatePuzzle ()
{
	return [ "_", 8, 2, 1, 5, 4, 7, 6, 3 ];
}

function print (puzzle)
{
	console.log(format(puzzle));
}

var actions =
{
	"left": safeMove.bind(null, "left"),
	"right": safeMove.bind(null, "right"),
	"down": safeMove.bind(null, "down"),
	"up": safeMove.bind(null, "up"),
	"solve": solve,
	"quit": quit
};

// check if we known how to handle the command
function isKnownAction (move)
{
	return move in actions;
}

// execute the command
function perform (move, puzzle)
{
	return actions[move](puzzle);
}

// handle when a user makes an unknown request
function handleUnknown (move, puzzle)
{
	console.log("Unrecognized move \"%s\". Please enter one of the following: %s", move, Object.keys(actions).join(", "));
	print(puzzle);
}

// nice format for puzzle
function format (puzzle)
{
	return puzzle.reduce(format, "");
	function format (text, val, idx)
	{
		return (idx + 1) % 3 === 0 ? (text + " " + val + "\n") : (text + " " + val);
	}
}

function safeMove (move, puzzle)
{
	if (!isSafeMove(move, puzzle))
	{
		console.log("Unable to move %s from here. Please enter another move.", move);
		return puzzle;
	}

	var newPuzzle = makeMove(move, puzzle);
	print(newPuzzle);

	return newPuzzle;

	function isSafeMove (move, puzzle)
	{
		var safeMoves = validMoves(puzzle);
		return safeMoves.indexOf(move) !== -1;
	}
}

function quit ()
{
	console.log("Thanks for playing.");
	process.exit(0);
}

// solve the puzzle for the user
function solve (puzzle)
{
	var path = doSolve(puzzle);
	var current = puzzle.concat();

	path.forEach
	(
		function (move)
		{
			console.log("Moving %s...", move);
			current = makeMove(move, current);

			print(current);
		}
	);

	return current;
}

function doSolve (initialPuzzle)
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
