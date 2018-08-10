// eslint warns on altering String.prototype (no-extend-native) not production code, just for
// purposes of testing speed

function anagrams(word, words) {
  String.prototype.sort = function sort() {
    return this.split('').sort().join('');
  };
  return words.filter(x => x.sort() === word.sort());
}

// anagrams('abcd', ['aabb', 'abcd', 'bbaa', 'dada']);
// running at 0.85ms

module.exports = anagrams;
