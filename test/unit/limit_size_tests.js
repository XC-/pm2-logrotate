'use strict';

var chai = require('chai');
var dirtyChai = require('dirty-chai');
var _ = require('lodash');

const limit_size = require('../../utils/limit_size');

var expect = chai.expect;

chai.use(dirtyChai);

describe('get_max_limit_size', function() {
  const BASE = 1024; // Specified base
  const DEFAULT_EXP = 2; // Specified default exponent
  const DEFAULT_MULTIPLIER = 10; // Specified default multiplier
  const EXPONENTS = {
    E: 6,
    P: 5,
    T: 4,
    G: 3,
    M: 2,
    k: 1
  };


  it('Should have the specified default values', function() {
    expect(limit_size.base).to.be.equal(BASE);
    expect(limit_size.default_exponent).to.be.equal(DEFAULT_EXP);
    expect(limit_size.default_multiplier).to.be.equal(DEFAULT_MULTIPLIER);
  });

  it('Should return the expected default when max_size undefined', function() {
    const size = limit_size.get_max(undefined);
    // Assume that base and default exponent are defined correctly (at this point) and are numbers.
    expect(size).to.be.equal(Math.pow(BASE, DEFAULT_EXP) * DEFAULT_MULTIPLIER);
  });

  it('Should return the expected default when it is unable to parse number from the given limit', function() {
    const size = limit_size.get_max('asdM');
    expect(size).to.be.equal(Math.pow(BASE, DEFAULT_EXP) * DEFAULT_MULTIPLIER);
  });

  it('Should return the expected default when the prefix is missing and number as string is given as limit', function() {
    const size = limit_size.get_max('100');
    expect(size).to.be.equal(Math.pow(BASE, DEFAULT_EXP) * DEFAULT_MULTIPLIER);
  });

  it('Should return the expected default when there is an alphabet in the middle of number', function() {
    const size = limit_size.get_max('100M000M');
    expect(size).to.be.equal(Math.pow(BASE, DEFAULT_EXP) * DEFAULT_MULTIPLIER);
  });

  it('Should calculate the size: MULTIPLIER * BASE ^ EXPONENT', function() {
    const multiplier = 100;
    _.forOwn(EXPONENTS, function(exp, prefix) {
      var expected_size = multiplier * Math.pow(BASE, exp);
      var size = limit_size.get_max(String(multiplier) + prefix);
      expect(size).to.be.equal(expected_size);
    })
  });
});
