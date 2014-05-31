var through = require('through');
var split = require('split');

process.stdin
	.pipe(split())
	.pipe(through(processLine))
	.pipe(process.stdout);

var testCases = null;
var currentCase = 1;
var n = null;
var n2 = null;
var puzzle = [];

function processLine (line) {
	if (testCases == null) {
		testCases = ~~line;
	}
	else if (n == null) {
		n = ~~line;
		n2 = n * n;
	}
	else {
		puzzle.push(line.split(" ").map(function (v) { return ~~v; }));
	}

	if (puzzle.length === n2) {
		var solved = isSolved(puzzle, n);
		var resultStr = "Case #" + currentCase + ": ";
		resultStr +=  (solved ? "Yes" : "No");

		n = null;
		puzzle = [];
		this.queue(resultStr + "\n");

		currentCase++;
	}

	if (currentCase > testCases) {
		this.queue(null);
	}
}

function isSolved(puzzle, n) {
	var n2 = n * n;
	return hasAllDigits(rows(puzzle, n2), n2)
		&& hasAllDigits(columns(puzzle, n2), n2) 
		&& hasAllDigits(sections(puzzle, n2), n2);
}

function hasAllDigits(groups, n2) {
	// o(n^4)
	// input is always n^2 rows of n^2 values each
	return groups.length > 0 && groups.every(allDigits);

	function allDigits (list) {
		return list.reduce(verify, {});

		function verify (acc, val) {
			// propagate false
			if (acc === false) return false;
			return inN2Range(val, n2) && !seen(val, acc)
				?  ((acc[val] = true), acc)
				: false;
		}
	}
}

function inN2Range (i, n2) {
	return i > 0 && i <= n2;
}

function seen (i, seen) {
	return i in seen;
}

/**
 * Return list of row values
 */
function rows (m, n2) {
	// O(1)
	return m;
}

/**
 * List of column values
 */
function columns (m, n2) {
	// transform row-based matrix into column-based matrix
	// O(n^4)
	// visit n^2 rows of n^2 columns
	return m.reduce(f, []);

	function f (cols, row) {
		row.forEach(g);
		return cols;

		function g (val, j) {
			cols[j] = cols[j] || [];
			cols[j].push(val);
		}
	}
}

/**
 * list of section values
 */
function sections (m, n2) {
	// treat it like a giant matrix
	// then iterate over the little matrices
	// O(n^4)
	var sections = [];
	var n = Math.floor(Math.sqrt(n2));

	for (var R = 0; R < n; R++) {
		for (var C = 0; C < n; C++ ) {
			var section = [];
			for (var r = R * n; r < ((R + 1) * n); r++) {
				for (var c = C * n; c < ((C + 1) * n); c++) {
					section.push(m[r][c]);
				}
			}
			sections.push(section);
		}
	}

	return sections;
}

