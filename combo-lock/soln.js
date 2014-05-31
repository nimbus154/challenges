function spinDistance (totalDigits, first, second, third) {
	/*
Here's how we got that number:
Spin lock 2 times clockwise: +10, at position 0
Spin lock to first number clockwise: +1, at position 1
Spin lock 1 time counter-clockwise: +5, at position 1
Spin lock to second number counter-clockwise: +4, at position 2
Spin lock to third number clockwise: +1, at position 3
*/
	return 2 * clockwise(0, totalDigits, totalDigits)
		+ clockwise(0, first, totalDigits)
		+ counterClockwise(first, first, totalDigits)
		+ counterClockwise(first, second, totalDigits)
		+ clockwise(second, third, totalDigits);
}

function clockwise (start, end, totalDigits) {

	return end > start ?
		end - start
		: (totalDigits - start) + end; // wrap around
}

function counterClockwise (start, end, totalDigits) {
	return start > end ?
		start - end
		: (totalDigits - end) + start; // wrap around
}

spinDistance.clockwise = clockwise;
spinDistance.counterClockwise = counterClockwise;

module.exports = spinDistance;
