/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const isMate = require('../isMateForTest');
const tests = require('./testDataForIsCheckIsMateTestRunners.js');


describe('Tests function isMate()', function () {
  tests.forEach(function (test) {
    const res = isMate(test.args[0], test.args[1]);
    it(`At Test Case: ${test.testCase} is ${test.isMateExpected}`, function (done) {
      expect(res).to.eql(test.isMateExpected);
      done();
    });
  });
});


/*
tests.forEach(function (test) {
    const res = Mate(test.args[0], test.args[1]);
    it(`Checks isCheck() ${test.args[0]} is ${test.expected}`, function () {
      function awaiter() {
        expect((res.piece).tostring()).to.eql(test.expected);
      }
      setTimeout(() => {
        awaiter();
      }, 1000);
    });
  });
  */