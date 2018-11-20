/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const reverse = require('../The soul of wit reverse an array');

describe('reverse() should reverse input array', function () {
  const tests = [
    { args: [2, 1, 4, 7], expected: [7, 4, 1, 2] },
    {
      args: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0, 1, 5],
      expected: [5, 1, 0, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    },
  ];
  tests.forEach(function (test) {
    it(`Checks reverses ${test.args} as ${test.expected}`, function () {
      const res = reverse(test.args);
      expect(res).to.eql(test.expected);
    });
  });
});
