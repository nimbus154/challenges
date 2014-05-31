/**
 * Determines if a graph is bipartite
 * @param g - a graph, represented by an adjacency matrix
 * @return true if g is bipartite
 */
module.exports = function isBipartite (g) {
	if (g.length === 0) return false;

	var mySet = { 0: true }; // set we expect to place a node
	var adjSet = {}; // set expected to contain node's neighbors

	var visited = {};
	var unvisited = [{ node: 0, mySet: mySet, adjSet: adjSet }];

	while (unvisited.length > 0) {
		var current = unvisited.shift();

		visited[current.node] = true;

		var adjacentNodes = g[current.node];
		adjSet = adjacentNodes.reduce(addAdjacent, current.adjSet);

		function addAdjacent (adjSet, isAdjacent, node) {
			if (isAdjacent) { 
				adjSet[node] = true;

				if (!(node in visited))
					unvisited.push({ node: node, mySet: adjSet, adjSet: current.mySet });
			}
			return adjSet;
		}
	}

	// check for nodes in both groups
	for (var node in mySet)
		if (adjSet[node]) return false;

	return true;
};

