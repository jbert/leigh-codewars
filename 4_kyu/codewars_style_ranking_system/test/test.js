/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
// or:   const expect = require('chai').expect;
const User = require('../style_ranking.js');

// the test uses the same 'user' object and applies user.incProgress() consecutively
describe('user.incProgress() should return Points, new Level and Progress through next level', function () {
  const tests = [
    { args: -8, expected: [-8, 3] },
    { args: -7, expected: [-8, 13] },
    { args: -6, expected: [-8, 40] },
    { args: -5, expected: [-8, 90] },
    { args: -4, expected: [-7, 60] },
    { args: -8, expected: [-6, 33] },
    { args: 1, expected: [-3, 93] },
    { args: 1, expected: [-2, 83] },
    { args: 1, expected: [-1, 23] },
    { args: 1, expected: [-1, 33] },
    { args: 1, expected: [-1, 43] },
    { args: 2, expected: [-1, 83] },
    { args: 2, expected: [1, 23] },
    { args: -1, expected: [-1, 24] },
    { args: 3, expected: [1, 64] },
    { args: 8, expected: [-6, 54] },
    { args: 8, expected: [6, 94] },
    { args: 8, expected: [7, 34] },
    { args: 8, expected: [7, 44] },
    { args: 8, expected: [7, 54] },
    { args: 8, expected: [7, 64] },
    { args: 8, expected: [7, 74] },
    { args: 8, expected: [7, 84] },
    { args: 8, expected: [7, 94] },
    { args: 8, expected: [8, 0] },
    { args: 8, expected: [8, 0] },
    { args: 8, expected: [8, 0] },
  ];

  const user = new User();

  tests.forEach(function (test) {
    it(`Checks incProgress() ${test.args} is ${test.expected}`, function () {
      const res = user.incProgress(test.args);
      function awaiter() {
        expect(res).to.eql(test.expected);
      }
      setTimeout(() => {
        awaiter();
      }, 500);
    });
  });
});
