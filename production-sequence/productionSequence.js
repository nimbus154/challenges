// Find the shortest possible series of words, such that s -> t by 1-letter
// transformations of words of exactly the same length
// INPUT
// s - string
// t - string to transform to
// D - set of strings
// OUTPUT
// shortest production sequence
// or -1 if none
// dog -> dag -> dan
// Create graph of words in dictionary
// see if you can traverse from s to t
function findProductionSequence (s, t, D) {
	// if s and t aren't the same length, exit
	// if s === t, return empty sequence
	// d = get all s.length words from D (filter)
	// q  = []
	// paths = { s: s }
	// current = s
	// while q isn't empty and s isn't null
	//		adjacent = getAdjacentWords(s, d)
	//		for a in adjacent
	//			if a is unvisited
	//				paths[a] = path to current + a
	//				if a === t, return path to a // win condition
	//				enqueue a
	//				mark a as visited
	//		current = q.head
	// return false
	//
	// construct a graph of these words, using s as starting point
	//		use adj list, keyed on word:
	//		{ word: [ adjacent words ] }
	//		(could use a getAdjacent function similar to maze one, instead of
	//		constructing graph, and enqueue all of those words)
	// traverse graph with BFS, keeping track of paths
	// when you reach t, return the path
	// no need for Dijkstra b/c edges aren't weighted


}

modules.exports = {
	findProductionSequence: findProductionSequence
};
