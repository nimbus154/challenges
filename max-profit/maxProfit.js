/**
 * determine the max profit over a given day range
 * buy and sell must take place at the start of the day
 * @param prices - array of prices with start, min, and max daily prices
 * @param start - start of range
 * @param end - end of range
 * @return max profit over day range
 */
module.exports = function maxProfit (a) {
	if (a.length === 2) {
		return a[1] - a[0];
	} else if (a.length < 2) {
		return 0;
	} else {
		var half = a.length / 2;
		var s1 = a.slice(0, half);
		var s2 = a.slice(half, a.length);
		var best1 = maxProfit(s1);
		var best2 = maxProfit(s2);
		var min = s1.reduce(function (min, cur) { return min > cur ? cur : min; }, s1[0]);
		var max = s2.reduce(function (max, cur) { return max > cur ? max : cur; }, s2[0]);
		var bestSplit = max - min;
		return Math.max(bestSplit, Math.max(best1, best2));
	}
};
