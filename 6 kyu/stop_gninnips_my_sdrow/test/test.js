/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const spinWords = require('../spinning_words.js');

describe('Reverses all words over 5 characters', function () {
  const tests = [
    { args: 'Hey fellow warriors', expected: 'Hey wollef sroirraw' },
    { args: 'This is a test', expected: 'This is a test' },
    { args: 'This is another test', expected: 'This is rehtona test' },
    { args: 'Hello this is a test sentence', expected: 'olleH this is a test ecnetnes' },
  ];

  tests.forEach(function (test) {
    it(`Checks spinWords of ${test.args} is ${test.expected}`, function () {
      const res = spinWords(test.args);
      expect(res).to.eql(test.expected);
    });
  });
});
