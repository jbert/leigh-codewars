function anagrams(word, words) {
  word = word.split('').sort().join('');
  return words.filter(function(v) {return word == v.split('').sort().join('');});
}

console.time('timer1');
anagrams('abcdedbaf', ['aabb', 'abcd', 'bbaa', 'dada']);
console.timeEnd('timer1');

// running at 0.9ms