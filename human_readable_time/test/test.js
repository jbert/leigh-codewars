/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const humanReadable = require('../human_readable.js');

describe('Checks if humanReadable returns correct time', function () {
  const tests = [
    { secs: 0, expected: '00:00:00' },
    { secs: 5, expected: '00:00:05' },
    { secs: 60, expected: '00:01:00' },
    { secs: 86399, expected: '23:59:59' },
    { secs: 359999, expected: '99:59:59' },
  ];

  tests.forEach(function (test) {
    it(`Checks ${test.secs} is returned via humanReadable() ${test.expected}`, function () {
      const res = humanReadable(test.secs);
      expect(res).to.equal(test.expected);
    });
  });
});
