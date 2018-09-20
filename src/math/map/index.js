// MobSin.math.map

/*
	Map a range of values to another range of values, given a point in that range.
	Eg,
		MobSin.math.map(5, 3, 7, 50, 100)
		> 75
*/
module.exports = (value, in_min, in_max, out_min, out_max) => {
	return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};