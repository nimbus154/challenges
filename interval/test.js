var expect = require('expect.js');
var hasGaps = require('./interval');

describe('interval', function () {
	var testCases = [
		{
			case: [ [0,4], [3,7] ],
			ans: false
		},
		{
			case: [ [2,6], [7,9] ],
			ans: true
		},
		{
			case: [ [2,6], [9,12], [3, 9] ],
			ans: false
		}
	];
	testCases.forEach(function (test) {
		it('should pass test case: ' + JSON.stringify(test.case), function () {
			expect(hasGaps(test.case)).to.be(test.ans);
		});
	});
});
