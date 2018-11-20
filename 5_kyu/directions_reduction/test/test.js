/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const dirReduc = require('../directions_reduction.js');

describe('Removes opposing directions', function () {
  const tests = [
    { args: ['NORTH', 'SOUTH', 'SOUTH', 'EAST', 'WEST', 'NORTH', 'WEST'], expected: ['WEST'] },
    { args: ['NORTH', 'WEST', 'SOUTH', 'EAST'], expected: ['NORTH', 'WEST', 'SOUTH', 'EAST'] },
    { args: ['NORTH', 'SOUTH', 'EAST', 'WEST', 'EAST', 'WEST'], expected: [] },
  ];
  tests.forEach(function (test) {
    it(`Checks ${test.args} resolves to ${test.expected}`, function () {
      const res = dirReduc(test.args);
      expect(res).to.eql(test.expected);
    });
  });
});


