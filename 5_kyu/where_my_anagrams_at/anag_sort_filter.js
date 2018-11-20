function anagrams(wrd, words) {
  let word = wrd;
  word = word.split('').sort().join('');
  return words.filter(a =>
    word === a.split('').sort().join(''));
}
// anagrams('abcd', ['aabb', 'abcd', 'bbaa', 'dada']);

module.exports = anagrams;
