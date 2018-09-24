/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
// or:   const expect = require('chai').expect;
const User = require('../style_ranking.js');

describe('user.incProgress() should return Points, new Level and Progress through next level', function () {
  const tests = [
    { args: '-7', expected: [-8, 10] },
    { args: '-6', expected: [-8, 40] },
    { args: '-5', expected: [-8, 90] },
    { args: '-4', expected: [-7, 60] },
    { args: '-3', expected: [-6, 50] },
    { args: '-2', expected: [-5, 60] },
    { args: '-1', expected: [-4, 90] },
    { args: '1', expected: [-2, 40] },
    { args: '2', expected: [1, 10] },
    { args: '3', expected: [3, 0] },
  ];
  tests.forEach(function (test) {
    it(`Checks incProgress() ${test.args} is ${test.expected}`, function () {
      const user = new User();
      const res = user.incProgress(test.args);
      expect(res).to.eql(test.expected);
    });
  });
});
