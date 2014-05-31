// want state inside of function
// if x is set, then set y
// but even more so, I want to not even worry about check that after its set
// just set it once and it's not considered
//
// I want to write something like this:
// control func
//		set the test cases
//		for 1...test cases
//			fetch matrix dim
//			fetch matrix
//			solve
//
// this code is clearly synchronous
// but if done in node style, it would look like:
//		get # test cases, fn (tc) {
//			while c < tc
//				async.auto
//					read line
//					read matrix, after reading line
//					solve matrix
//
//			this would pause and resume the stream, I guess
//		}
var async = require('async');
var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false // turn off echo
});

var tasks = {};

tasks.testCases = setTestCases;
tasks.matrixSize = [ 'testCases', setMatrixSize ];
tasks.matrix = [ 'matrixSize', parseMatrix ];
tasks.isValid = [ 'parseMatrix', solve];

async.auto(tasks, solved);

function setTestCases (cb) {
	rl.once('line', setTestCases);
	rl.once('line', matrixSize);

	function setTestCases (data) {
		console.log('tc');
		rl.pause();
		return cb(null, { testCases: ~~data, current: 0 });
	}
}

rl.on('pause', function () { console.log('paused'); })
rl.on('resume', function () { console.log('resume'); })

function setMatrixSize (cb, results) {
	rl.once('line', matrixSize);
}

	function matrixSize (data) {
		console.log('f');
		// results.testCases.current++;
		return cb(null, ~~data);
	}

function parseMatrix (cb, results) {

	var n = results.matrixSize;
	var n2 = n * n;
	var matrix = [];

	rl.on('line', setMatrixSize);

	function parseMatrix (data) {
		matrix.push(data.split(' ').map(function (n) { return ~~n; }));

		if (matrix.length === n2) {
			rl.removeListener('line', parseMatrix);
			return cb(null, matrix);
		}
	}
}

function solve (cb, results) {
	console.log('matrix:', results.matrix);
	return cb(null, true);
}

function solved (err, result) {
	console.log('Result:', result.isValid);
}
