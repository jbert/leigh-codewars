// eslint won't allow altering String.prototype, not production code, just for purposes
// of testing speed

function anagrams(word, words) {
  console.time('queryTime');
  String.prototype.sort = function sort() {
    return this.split('').sort().join('');
  };
  return words.filter(x => x.sort() === word.sort());
}

anagrams('abcd', ['aabb', 'abcd', 'bbaa', 'dada']);
console.timeEnd('queryTime');

// running at 0.85ms
