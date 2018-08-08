/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const isPangram = require('../pangram.js');
const isPangram2 = require('../pangram2.js');

describe('Testing 2 versions of solution', function () {
  const tests = [
    { phrase: 'abcdefghijklmnopqrstuvwxyz', expected: true },
    { phrase: 'The quick brown fox jumps over the lazy dog', expected: true },
    { phrase: 'abcdefxyz', expected: false },
  ];

  describe('Version 1, isPangram ()', function () {
    tests.forEach(function (test) {
      it(`Checks ${test.phrase} to see if it is a Pangram and expects the result to be ${test.expected}`, function () {
        const res = isPangram(test.phrase, test.expected);
        expect(res).to.equal(test.expected);
      });
    });
  });

  describe('Version 2, isPangram2()', function () {
    tests.forEach(function (test) {
      it(`Checks ${test.phrase} to see if it is a Pangram and expects the result to be ${test.expected}`, function () {
        const res = isPangram2(test.phrase, test.expected);
        expect(res).to.equal(test.expected);
      });
    });
  });
});
