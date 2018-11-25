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

  let maxCount = 0;
  let maxCountIndex = 0;

  let currentCount = 0;

  for (let i = 0; i <= (n - k); i++) {
    // Sum of lengths from this index
    currentCount = strings.slice(i, i+k).map(s => s.length).reduce((a, v) => a + v)
    if (currentCount > maxCount) {
      maxCount = currentCount;
      maxCountIndex = i;
    }
  }

  return strings.slice(maxCountIndex, maxCountIndex + k).join('')
}

console.log(longestConsec(['zone', 'abignale', 'theta', 'libeboo', 'thetrtya', 'abigailg'], 4));

// for test
module.exports = longestConsec;
