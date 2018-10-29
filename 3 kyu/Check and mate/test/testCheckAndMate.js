/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const isCheck = require('../checkAndMate_isCheck');
const isMate = require('../checkAndMate_isMate');
const tests = require('./testDataForCheckAndMateTestRunner.js');

describe('Tests function isCheck() "from check and mate.js"', function () {
  tests.forEach(function (test) {
    const resultingObjectToString = JSON.stringify(test.isCheckExpected);
    const res = isCheck(test.args[0], test.args[1]);
    it(`At Test Case: ${test.testCase} is ${resultingObjectToString}`, function (done) {
      expect(res).to.eql(test.isCheckExpected);
      done();
    });
  });
});

describe('Tests function isMate() "from check and mate.js"', function () {
  tests.forEach(function (test) {
    const res = isMate(test.args[0], test.args[1]);
    it(`At Test Case: ${test.testCase} expected to return ${test.isMateExpected}`, function (done) {
      expect(res).to.eql(test.isMateExpected);
      done();
    });
  });
});
