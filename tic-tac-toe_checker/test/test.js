const expect = require('chai').expect;
const isSolved = require('../checker.js');

describe('twoSum()', function() {
  const tests = [
    {args: [[2,1,2], [2,1,1], [1,2,1]], expected: 0 },
    {args: [[2,2,2], [0,1,1], [1,0,0]], expected: 2 },
    {args: [[1,2,1], [1,1,2], [2,1,2]], expected: 0 },
    {args: [[2,1,1], [0,1,1], [2,2,2]], expected: -1 },
    {args: [[1,1,1], [0,2,2], [0,0,0]], expected: 1 }
  ];
  tests.forEach( function(test) {
    it(`Checks ${test.args} and returns the winner of the game as ${test.expected}`, function() {
      const res = isSolved(test.args);
      expect(res).to.eql(test.expected);
    });
  });
});
