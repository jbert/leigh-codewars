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

  let currentCount = 0;
  let lengths = strings.map(s => s.length)

  // Prime the pump - calculate for index 0
  let maxCount = 0;
  let maxCountIndex = 0;
  currentCount = lengths.slice(0, k).reduce((a, v) => a + v)

  for (let i = 1; i <= (n - k); i++) {
    // We've finished this string
    currentCount -= lengths[i-1]
    // And want this one
    currentCount += lengths[i+k-1]
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
