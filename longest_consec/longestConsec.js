// Finds the longest concat string from input array containing k entries

function longestConsec(strarr, k) {
  const n = strarr.length;
  if ((n === 0) || (k > n) || (k <= 0)) {
    return '';
  }

  // Pseudo: countPointer [`longest concat character count`, `starting index in strarr`]
  const countPointer = [0, 0];
  let tempCount = 0;

  // start at beginning of array, loop to n-k, sum the elements concat with next k items in array
  for (let i = 0; i <= (n - k); i++) {
    tempCount = 0;
    for (let j = i; j < i + k; j++) {
      tempCount += strarr[j].length;
    }
    // if larger than current max, replace with current max and store position in countPointer[1]
    if (tempCount > countPointer[0]) {
      countPointer[0] = tempCount;
      countPointer[1] = i;
    }
    // when reach end, cycle through array from given starting element and return concat. strings
    if (i === (n - k)) {
      let str = '';
      for (let l = countPointer[1]; l < (countPointer[1] + k); l++) {
        str += strarr[l];
      }
      return str;
    }
  }
}

// longestConsec(["zone", "abig", "theta", "form", "libe", "zas", "theta", "abigail"], 2)
