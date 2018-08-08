function isPangram(string) {
  const strng = string.toLowerCase();
  return 'abcdefghijklmnopqrstuvwxyz'.split('').every(x =>
    strng.indexOf(x) !== -1);
}

// console.assert(isPangram('The quick brown fox jumps over the lazy dog') === true);
// for test

module.exports = isPangram;
