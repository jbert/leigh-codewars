/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const digitalRoot = require('../digitalRoot.js');

describe('Finds the digital route of a number - calls digitalRoot', function () {
  const tests = [
    { args: 942, expected: 6 },
    { args: 16, expected: 7 },
    { args: 15, expected: 6 },
    { args: 5, expected: 5 },
    { args: 2046, expected: 3 },
  ];
  tests.forEach(function (test) {
    it(`Checks ${test.args} digital root is ${test.expected}`, function () {
      const res = digitalRoot(test.args);
      expect(res).to.eql(test.expected);
    });
  });
});
