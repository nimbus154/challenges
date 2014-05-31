// an algorithm that reveals portions of the minesweeper board

// INPUT: cell - tuple (x, y) on which user clicked
//		  grid - 2D array of { mine, revealed, adjacentMines }
// OUTPUT: new grid with squares revealed
// We assume the isMine(cell) check is invoked prior to this algorithm
function Cell (x, y) {
	this.x = x;
	this.y = y;
}

// spread algorithm only reveals up, down, left, right
var SpreadDirections = {
	"up": function (cell) { return new Cell(cell.x, cell.y + 1); },
	"down": function (cell) { return new Cell(cell.x, cell.y - 1); },
	"left": function (cell) { return new Cell(cell.x - 1, cell.y); },
	"right": function (cell) { return new Cell(cell.x + 1, cell.y); }
};

// mine should check all directions around a cell
var MineDirections = {
	"up-left": function (cell) { return new Cell(cell.x - 1, cell.y + 1); },
	"up-right": function (cell) { return new Cell(cell.x + 1, cell.y + 1); },
	"down-left": function (cell) { return new Cell(cell.x - 1, cell.y - 1); },
	"down-right": function (cell) { return new Cell(cell.x + 1, cell.y - 1); },
	// should merge these programmatically, or inerit SpreadDirections
	"up": function (cell) { return new Cell(cell.x, cell.y + 1); },
	"down": function (cell) { return new Cell(cell.x, cell.y - 1); },
	"left": function (cell) { return new Cell(cell.x - 1, cell.y); },
	"right": function (cell) { return new Cell(cell.x + 1, cell.y); }
};

function spread (firstCell, grid) {
	var newGrid = grid; // TODO create a new grid rather than modify old one
	var unvisited = [ firstCell ];

	while (unvisited.length) {
		var cell = unvisited.shift();
		getCell(cell, grid).revealed = true;

		Object.keys(SpreadDirections).forEach(visit);

		function visit (direction) {
			var newCell = SpreadDirections[direction](cell);

			if (canMoveTo(newCell, grid))
				unvisited.push(newCell); // enqueue this on a list of cells to visit
			/*
			else if (inBounds(cell, grid) && isMine(newCell, grid))
				// would be better to count the mines in a pre-processing step at the beginning of the game
				getCell(cell, grid).adjacentMines = countAdjacentMines(cell, grid);
			*/
		}
	}
}

function canMoveTo (cell, grid) {
	// if in bounds and not a mine
	return inBounds(cell, grid)
		&& !isMine(cell, grid)
		&& !isRevealed(cell, grid);  // don't visit same cell multiple times
}

function inBounds (cell, grid) {
	return cell.x < grid.length && grid[cell.x].length < cell.y;
}

function isMine (cell, grid) {
	return getCell(grid).mine;
}

function isRevealed (cell, grid) {
	return getCell(cell, grid).revealed;
}

function getCell (cell, grid) {
	return grid[cell.x][cell.y];
}

function countAdjacentMines (cell, grid) {
	Object.keys(MineDirections).reduce(count, 0);
	function count (direction) {
		var newCell = MineDirections[direction](newCell);
		if (canMoveTo(newCell, grid)) {

		}
		return acc;
	}
}
