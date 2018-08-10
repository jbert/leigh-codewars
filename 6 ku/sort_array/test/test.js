/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const sortArray = require('../sortArray.js');

describe('It should sort the array into ascending but even numbers remain in place', function () {
  const tests = [
    { args: [5, 3, 2, 8, 1, 4], expected: [1, 3, 2, 8, 5, 4] },
  ];

  tests.forEach(function (test) {
    it(`Checks ${test.args} is sorted into ascending leaving evens where they are as ${test.expected}`, function () {
      const res = sortArray(test.args);
      expect(res).to.eql(test.expected);
    });
  });
});
