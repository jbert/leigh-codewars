/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const longestConsec = require('../longestConsec.js');

describe('Checks input array for longest strings of num entries and concatenates - calling longestConsec', function () {
  const tests = [
    { args: ['zone', 'abig', 'theta', 'form', 'libe', 'zas', 'theta', 'abigail'], num: 2, expected: 'thetaabigail' },
    { args: ['zone', 'abignale', 'theta', 'form', 'libeboo', 'zas', 'theta', 'abigail'], num: 1, expected: 'abignale' },
    { args: ['zone', 'abignale', 'theta', 'form', 'libeboo', 'zas', 'theta', 'abigail'], num: 3, expected: 'zoneabignaletheta' },
  ];
  tests.forEach(function (test) {
    it(`Checks ${test.args}, for the longest ${test.num} consecutive entries and concats to be ${test.expected}`, function () {
      const res = longestConsec(test.args, test.num);
      expect(res).to.equal(test.expected);
    });
  });
});
