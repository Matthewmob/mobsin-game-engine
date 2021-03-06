/**
 * Interpolates a value cubically, starting slowly and speeding up.
 *
 * @function in
 * @memberof Whirl.easing.cubic
 *
 * @param {number} t Interpolant between one (1) and zero(0).
 * @returns {number}
 */
export default (t) => t * t * t;
