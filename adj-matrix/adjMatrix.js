var adjMatrix = {};

adjMatrix.generate = function (input) {

	var lines = input.split('\n');
	var numNodes = parseInt(lines[0].split(/\D/)[0]);
	var nodeMaps = lines.slice(1);

	return nodeMaps.reduce(function (adj, nodeMap) {
		var nodes = nodeMap.split('->');
		return mapNodes(
			nodes[0].split(/\D/), 
			nodes[1].split(/\D/), 
			adj
		);

	}, initMatrix(numNodes));
}

function mapNodes(from, to, adj) {
	return from.reduce(function (a, f) {
		f = parseInt(f);

		if (f || f === 0) {
			a[f] = to.reduce(function (row, t) {
				t = parseInt(t);
				if (t || t === 0) row[t] = 1;
				return row;
			}, a[f] || []);
		}

		return a;
	}, adj);
}

function initMatrix(n) {
	var a = [];
	for (var i = 0; i < n; i++) {
		a.push([]);
		for(var j = 0; j < n; j++) {
			a[i].push(0);
		}
	}
	return a;
}

module.exports = adjMatrix;
