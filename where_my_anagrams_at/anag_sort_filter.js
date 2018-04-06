function anagrams(wrd, words) {
  let word = wrd;
  word = word.split('').sort().join('');
  return words.filter(a =>
    word === a.split('').sort().join(''));
}

console.time('timer1');
anagrams('abcd', ['aabb', 'abcd', 'bbaa', 'dada']);
console.timeEnd('timer1');

// running at 0.9ms
