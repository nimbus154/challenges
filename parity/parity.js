/**
 * compute the parity of an integer
 * @param n - an integer
 * @return the number of 1 bits set in n
 */
module.exports = function parity (n) {
	n = ~~n; // cast to int

	// iterate over all bits, count
	// linear
	// can you do better than linear?
	// split the number in half by bits
	// counts the bits in each half
	// i don't think that yields logarithmic time, it just complicates linear
	// 0 = 0
	// 1 = 1
	// 2 = 10
	// 3 = 11
	// 4 = 100
	// 5 = 101
	// 6 = 110
	// 7 = 111
	// 8 = 1000
	// 9 = 1001
	// 10 = 1010
	var parity = 0;
	return parity;
}
