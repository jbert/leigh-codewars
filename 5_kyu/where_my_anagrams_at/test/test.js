/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const anagrams = require('../anag.js');
const anagrams2 = require('../anag_augment_proto.js');
const anagrams3 = require('../anag_sort_filter.js');

describe('Testing 3 versions of solution', function () {
  const tests = [
    { word: 'abba', words: ['aabb', 'abcd', 'bbaa', 'dada'], expected: ['aabb', 'bbaa'] },
    { word: 'racer', words: ['crazer', 'carer', 'racar', 'caers', 'racer'], expected: ['carer', 'racer'] },
    { word: 'laser', words: ['lazing', 'lazy', 'lacer'], expected: [] },
  ];

  describe('Version 1 - for loop, anagrams()', function () {
    tests.forEach(function (test) {
      it(`Checks ${test.word} against ${test.words} and expects the match to be ${test.expected}`, function () {
        const res = anagrams(test.word, test.words);
        expect(res).to.eql(test.expected);
      });
    });
  });

  describe('Version 2, augment String.prototype - anagrams2()', function () {
    tests.forEach(function (test) {
      it(`Checks ${test.word} against ${test.words} and expects the match to be ${test.expected}`, function () {
        const res = anagrams2(test.word, test.words);
        expect(res).to.eql(test.expected);
      });
    });
  });

  describe('Version 3, sort & filter - anagrams3()', function () {
    tests.forEach(function (test) {
      it(`Checks ${test.word} against ${test.words} and expects the match to be ${test.expected}`, function () {
        const res = anagrams3(test.word, test.words);
        expect(res).to.eql(test.expected);
      });
    });
  });
});
