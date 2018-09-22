/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
// or:   const expect = require('chai').expect;
const User = require('../style_ranking.js');

describe('user.incProgress() should return Points, new Level and Progress through next level', function () {
  const tests = [
    { args: '-7', expected: [10, -8, 10] },
    
  ];
  tests.forEach(function (test) {
    it(`Checks incProgress() ${test.args} is ${test.expected}`, function () {
      const user = new User();
      const res = user.incProgress(test.args);
      expect(res).to.eql(test.expected);
    });
  });
});
