// the Set below ensures unique values in array, sort them then check array === alphabet array
// note there are edge cases where array.toString() comparison not best practice
// allowed here as have already parsed the array input so will know the type exactly

function isPangram(string) {
  let str = string.toUpperCase();
  str = str.match(/[a-zA-Z]/ig);
  const deDup = [...new Set(str)];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alph = alphabet.split('');
  if (deDup.sort().toString() === alph.toString()) {
    return true;
  }
  return false;
}

// console.log(isPangram('The quick brown fox jumps over the lazy dog'));

/*
A pangram is a sentence that contains every single letter of the alphabet at least once.
For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because
 it uses the letters A-Z at least once (case is irrelevant).

Given a string, detect whether or not it is a pangram. Return True if it is, False if not
Ignore numbers and punctuation

var string = "The quick brown fox jumps over the lazy dog."
Test.assertEquals(isPangram(string), true)
var string = "This is not a pangram."
Test.assertEquals(isPangram(string), false)
*/
