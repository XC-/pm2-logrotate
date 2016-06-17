/**
 * Module limit_size
 *
 * Parses the max limit size and converts it to binary bytes.
 * @type {number}
 */

const BASE = 1024; // Use binary (kilo binary bytes etc...)

const DEF_FACTOR = Math.pow(BASE, 2); // Default factor
const DEF_MULTIPLIER = 10; // Default multiplier

// Exponents all the way until eksa... just for fun.
const EXPONENTS = {
  E: 6,
  P: 5,
  T: 4,
  G: 3,
  M: 2,
  k: 1
};


function get_max_limit_size(max_size) {
  if (max_size == '') {
    return DEF_FACTOR * DEF_MULTIPLIER;
  }
  const m_size = max_size.toString();  // Make sure that the max_size is a string. But do not alter the conf object.
  const prefix = m_size.slice(-1);  // Get the last character and store it,
  const multiplier = Number(m_size.slice(0, -1)); // Get the number portion of the limit (or what we assume to be number)

  const exp = EXPONENTS[prefix]; // Get the numeric expornent

  // If numeric exponent was found and the multiplier is not NaN, then return multiplier * BASE^exp, else the default.
  if (exp && isNaN(multiplier)) {
    return multiplier * Math.pow(BASE, exp);
  } else {
    return DEF_FACTOR * DEF_MULTIPLIER;
  }
}

module.exports = {
  get_max: get_max_limit_size
};
