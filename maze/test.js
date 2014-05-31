var solve = require('./solver').solve;

var maze = [
	[ 0, 1, 1 ],
	[ 1, 1, 1 ], 
	[ 1, 0, 1 ]
];


console.log(solve (maze, { row: 2, col: 0 }, { row: 2, col: 0 }));
console.log(solve (maze, { row: 2, col: 0 }, { row: 0, col: 2 }));
