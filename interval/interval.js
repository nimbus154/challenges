/*
 *  
 *  Interval Coding Challenge
 *   
 *   Given an array of arrays each containing two numbers that represent
 *   intervals, create a function to determine if there are any gaps within the
 G
 *    
 *    For example:
 *     
 *     [ [0,4], [3,7] ] => false, no gaps
 *     ----- [0,4]
 *        ----- [3, 7]
 *                 
 *     [ [2,6], [7,9] ] => true, has gaps
 *        ----- [2,6]
 *                     ----- [7, 9]
 *                    
 *     [ [2,6], [9,12], [3,9] ] => false, no gaps
 *     ----- [2,6]
 *                         ----- [9,12]
 *            -------- [3,9]
 *                                                 
 */

module.exports = function hasGaps (intervals) {

	var sorted = intervals.sort(function (i1, i2) { return i1[0] - i2[0]; });
	for (var i = 1; i < sorted.length; i++) {
		if (!overlaps(sorted[i - 1], sorted[i])) {
			return true;
		}
	}
	return false;
};

function overlaps (r1, r2) {
	/*
	 * return true if ranges overlap
	 */
	return Math.min(r1[1], r2[1]) - Math.max(r1[0], r2[0]) >= 0;
}
