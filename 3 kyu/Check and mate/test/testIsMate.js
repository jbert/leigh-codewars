/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const isMate = require('../isMateForTest');
const tests = require('./testDataForIsCheckIsMateTestRunners.js');


describe('Tests function isMate()', function () {
  tests.forEach(function (test) {
    const res = isMate(test.args[0], test.args[1]);
    it(`At Test Case: ${test.testCase} expected to return ${test.isMateExpected}`, function (done) {
      expect(res).to.eql(test.isMateExpected);
      done();
    });
  });
});
