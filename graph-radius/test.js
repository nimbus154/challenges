var graphRadius = require('./graphRadius');

var a = 
[
	[0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
	[1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
	[0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
	[0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
	[1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
	[0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
	[0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 1, 1, 0, 0]
];

var expected = 2;
var actual = graphRadius(a.length, a);

assert(expected, actual);
	
function assert(expected, actual) {
	if (expected === actual)
		console.log('Success!');
	else
		console.log('Expected', actual, 'to be', expected);
}
