// Finds the longest concat string from input array containing k entries

function longestConsec(strarr, k) {
  let n = strarr.length;
  if ( (n == 0) || (k > n) || (k <= 0)) {
    return "";
  }
  
  // countPointer pseudo [`longest concatenated character count`, `start position of longest str concat in strarr`]
  let countPointer = [0, 0];
  let tempCount = 0;

  //start at beginning of array, loop to n-k, for each sum the elements concatatenated with next k items in array 
  for (i = 0; i <= (n - k); i++) {
    tempCount = 0;
    for (j = i; j < i + k; j++){
      tempCount += strarr[j].length;
      }
    // if larger than current max, replace with current max and store position in countPointer[1]
    if (tempCount > countPointer[0]) {
      countPointer[0] = tempCount;
      countPointer[1] = i;
    }
    // when reach end, cycle through array from given starting element and return concatenated strings
    if (i == (n - k)){
      let str = "";
    for (l = countPointer[1]; l < (countPointer[1] + k); l++){
        str += strarr[l];
      }
    return str;
    }
  }
}

// longestConsec(["zone", "abig", "theta", "form", "libe", "zas", "theta", "abigail"], 2)

 