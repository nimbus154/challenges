function solve (maze, start, end) {
	console.log('Traveling from', start, ' to ', end);
	var current = start;
	var queue = [];
	var visited = {};
	markVisited(start, visited);

	while (queue.length > 0 || current) {
		if (foundExit(current, end)) return "found";

		var adjacent = getAdjacent(current, maze);

		adjacent.forEach(addUnvisited);
		function addUnvisited (space) {
			if (isUnvisited(space, visited)) {
				queue.push(space);
				markVisited(space, visited);
				printProgress(maze, visited);
			}
		}

		current = queue.shift();
	}
	return "not found";
}

function foundExit (current, exit) {
	return current.row === exit.row && current.col === exit.col;
}

function isUnvisited (space, visited) { 
	return !(hashCode(space) in visited); 
}

function hashCode (space) { 
	return space.row + ',' + space.col; 
}

function markVisited (space, visited) { 
	visited[hashCode(space)] = true; 
}

function printProgress (maze, visited) {
	maze.forEach(printRow);
	console.log(''); // linefeed

	function printRow (row, rowIndex) { 
		var cols = row.map(markedCols);
		console.log(cols.join(' '));

		function markedCols (col, colIndex) {
			return isUnvisited({ row: rowIndex, col: colIndex }, visited) 
				? maze[rowIndex][colIndex] : 'x';
		}
	}
}

function getAdjacent (current, maze) {
	var adjacent = [
		{ row: current.row + 1, col: current.col }, // up
		{ row: current.row + 1, col: current.col + 1 }, // up-right
		{ row: current.row + 1, col: current.col - 1 }, // up-left
		{ row: current.row - 1, col: current.col }, // down
		{ row: current.row - 1, col: current.col + 1 }, // down-right
		{ row: current.row - 1, col: current.col - 1 }, // down-left
		{ row: current.row, col: current.col + 1 }, // right
		{ row: current.row, col: current.col - 1 } // left
	];

	return adjacent.filter(isValid);

	function isValid (space) { 
		return isInMaze(space, maze) && isNotWall(space, maze);
	}
}

function isInMaze (space, maze) {
	return space.row >= 0 
		&& space.row < maze.length 
		&& space.col >= 0
		&& space.col < maze[space.row].length; 
}

function isNotWall (space, maze) { 
	return !!maze[space.row][space.col]; 
}

module.exports = {
	solve: solve
};
