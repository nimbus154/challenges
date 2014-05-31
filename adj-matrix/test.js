var expect = require('expect.js');
var adjMatrix = require('./adjMatrix');

describe('Generate adj matrix', function () {
	it('should generated the expected output', function () {
		var input = '5 5\n'
				+ '0 -> 1\n'
				+ '1 -> 2\n'
				+ '2 -> 4\n'
				+ '3 -> 4\n'
				+ '0 -> 3';
		var output = [
			[0, 1, 0, 1, 0],
			[0, 0, 1, 0, 0],
			[0, 0, 0, 0, 1],
			[0, 0, 0, 0, 1],
			[0, 0, 0, 0, 0]
		];

		
		var actual = adjMatrix.generate(input);
		for (var i = 0; i < output.length; i++) {
			for (var j = 0; j < output[i].length; j++) {
				expect(actual[i][j]).to.be(output[i][j]);
			}
		}
	});

	it('should work for multimaps', function (){
		var input = '5 4\n'
				+'0 -> 1\n'
				+'1 -> 2\n'
				+'2 3 -> 4 0\n'
				+'0 -> 3';
		var output = [
			[0,1,0,1,0],
			[0,0,1,0,0],
			[1,0,0,0,1],
			[1,0,0,0,1],
			[0,0,0,0,0]
		];
		var actual = adjMatrix.generate(input);
		for (var i = 0; i < output.length; i++) {
			for (var j = 0; j < output[i].length; j++) {
				expect(actual[i][j]).to.be(output[i][j]);
			}
		}
	});
});
