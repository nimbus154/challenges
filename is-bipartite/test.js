var isBipartite = require('./isBipartite');

var testCases = [
	{
		descr: 'single node',
		case: [ [0] ],
		ans: true
	},
	{
		descr: 'simple cycle',
		case: [ [1] ],
		ans: false
	},
	{
		descr: 'basic bipartite',
		case: [ 
			/*
			 0 <-> 1
			 ^	   ^
			 |	   |
			 v	   V
			 2 <-> 3
			 */
			[0, 1, 1, 0],
			[1, 0, 0, 1],
			[1, 0, 0, 1],
			[0, 1, 1, 0]
		],
		ans: true
	},
	{
		descr: 'basic not bipartite',
		case: [ 
			[1, 1, 1],
			[1, 1, 1],
			[1, 1, 1]
		],
		ans: false
	}
];

testCases.forEach(function (t) {
	var actual = isBipartite(t.case);
	console.log('test: ' + t.descr);
	if (actual === t.ans) {
		console.log('\tPASS');
	} else {
		console.log('\tFAIL');
	}
});
