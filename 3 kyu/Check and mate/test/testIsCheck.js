/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const isCheck = require('../isCheckForTest');
const tests = require('./testDataForIsCheckIsMateTestRunners');

describe('Tests function isCheck()', function () {
  tests.forEach(function (test) {
    const resultingObjectToString = JSON.stringify(test.isCheckExpected);
    const res = isCheck(test.args[0], test.args[1]);
    it(`At Test Case: ${test.testCase} is ${resultingObjectToString}`, function (done) {
      expect(res).to.eql(test.isCheckExpected);
      done();
    });
  });
});
/*

const tests = [
  { args: [
    [ { piece: 'king', owner: 1, x: 4, y: 0 },
      { piece: 'queen', owner: 1, x: 0, y: 7 },
      { piece: 'king', owner: 0, x: 4, y: 7 }
    ],
    0,
  ],
  expected: 20,
  },
];

describe('isCheck', function() {
  tests.forEach(function (test) {
    const res = isCheck(test.args[0], test.args[0]);
    it(`Checks isCheck() ${test.args[0]} is ${test.expected}`, function () {
      function awaiter() {
        expect((res.piece).tostring()).to.eql(test.expected);
      }
      setTimeout(() => {
        awaiter();
      }, 1000);
    });
  });
});
*/
