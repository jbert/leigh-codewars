// Stringifies, splits to an array of strings, parseInt each
// reduce by adding elements in array, if Arr.length > 1, recursion

function digital_root(num) {
  const Arr = (num).toString(10).split('').map(a => parseInt(a, 10));
  if (Arr.length > 1) {
    return digital_root(Arr.reduce(((acc, elem) => acc + elem), 0));
  }
  return Arr[0];
}

// digital_root(942);

/*
In this kata, you must create a digital root function.

A digital root is the recursive sum of all the digits in a number. Given n, take the sum
of the digits of n. If that value has two digits, continue reducing in this way until a
single-digit number is produced. This is only applicable to the natural numbers.

digital_root(16)
=> 1 + 6
=> 7

digital_root(942)
=> 9 + 4 + 2
=> 15 ...
=> 1 + 5
=> 6
*/
