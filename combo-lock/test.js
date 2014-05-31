/*
Sample Input
5 1 2 3

Sample Output
21
*/

var spinDistance = require('./soln');
var expect = require('expect.js');

describe('Combination Lock', function() {
	it('should return 21 for 5 1 2 3', function () {
		expect(spinDistance(5, 1, 2, 3)).to.be(21);
	});
});

describe('Clockwise', function () {
	it('should handle simple increase', function () {
		expect(spinDistance.clockwise(0, 1, 5)).to.be(1);
	});

	it('should handle wrap arounds', function () {
		expect(spinDistance.clockwise(1, 0, 5)).to.be(4);
	});

	it('should return totalDigits when same number given', function () {
		expect(spinDistance.clockwise(1, 1, 5)).to.be(5);
	});
});

describe('Counter-Clockwise', function () {
	it('should handle simple increase', function () {
		expect(spinDistance.counterClockwise(1, 0, 5)).to.be(1);
	});

	it('should handle wrap arounds', function () {
		expect(spinDistance.counterClockwise(0, 1, 5)).to.be(4);
	});

	it('should return totalDigits when same number given', function () {
		expect(spinDistance.counterClockwise(1, 1, 5)).to.be(5);
	});
});
