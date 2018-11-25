/* You are given an array strarr of strings and an integer k. Your task is to return the first
longest string consisting of k consecutive strings taken in the array

eg: longest_consec(["zone", "abigail", "theta", "form", "libe", "zas", "theta", "abigail"], 2)
--> "abigailtheta"

n being the length of the string array, if n = 0 or k > n or k <= 0 return ""
*/

// Finds the longest k consecutive string concatenated, from input array containing n entries

function longestConsec(strings, k) {
  const n = strings.length;
 
  // Early return for trivial cases
  if ((n === 0) || (k > n) || (k <= 0)) {
    return '';
  }

  let longestCount = 0;
  let longestCountIndex = 0;

  let currentCount = 0;

  // start at beginning of array, loop to n-k, sum the elements concat with next k items in array
  for (let i = 0; i <= (n - k); i++) {
    currentCount = 0;
    for (let j = i; j < i + k; j++) {
      currentCount += strings[j].length;
    }
    if (currentCount > longestCount) {
      longestCount = currentCount;
      longestCountIndex = i;
    }
  }

  let str = '';
  for (let l = longestCountIndex; l < (longestCountIndex + k); l++) {
    str += strings[l];
  }
  return str;
}

console.log(longestConsec(['zone', 'abignale', 'theta', 'libeboo', 'thetrtya', 'abigailg'], 4));

// for test
module.exports = longestConsec;
