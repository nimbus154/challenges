module.exports = function (size, adj) {
	// floyd + min
	return matrixMin(floyd(adj));
};

var INF = 100000000;

function floyd (adj) {
	var asps = init();

	for (var k = 1; k <= adj.length; k++) {
		for (var i = 0; i < adj.length; i++) {
			for (var j = 0; j < adj.length; j++) {
				asps[k][i][j] = Math.min(
						asps[k - 1][i][k - 1] + asps[k -  1][k - 1][j],
						asps[k - 1][i][j]
				);
			}
		}
	}
	return asps[k - 1];

	function init () {
		var asps = [];
		for (var i = 0; i <= adj.length; i++) {
			asps.push([]);
			for (var j = 0; j <= adj.length; j++) {
				asps[i].push([]);
				if (i === j) {
					asps[0][i][j] = 0;
				} else {
					asps[0][i][j] = (adj[i] && adj[i][j]) || INF;
				}
			}
		}
		return asps;
	}
}


function matrixMin (m) {
	console.log(m);
	var min = INF;
	for (var i = 0; i < m.length; i++) {
		for (var j = i + 1; j < m[i].length; j++) {
			min = Math.min(min, m[i][j]);
		}
	}
	return min;
}
