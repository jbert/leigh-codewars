// In this kata you have to create all permutations of an input string and remove duplicates, if
// present. This means, you have to shuffle all letters from the input in all possible orders

// Solution uses recursion. Taking first 2 digits, reverses, store both in array, then
// take another digit, and place in every possible position in each array, stores them,
// recurses until all digits added in all positions

function permutations(string) {
  const ltrBank = string.split('');
  let Arr1 = [];
  let tempTotal = [];
  let Total = [];

  // setting initial value of Arr1, make sure min of 2 digits to reverse
  Arr1 = [[(ltrBank.pop())]];
  if (Arr1.length < 2 && ltrBank.length > 0) {
    Arr1[0].push(ltrBank.pop());
  }

  // mixLtrs pops letter off, then places it at every position in array stores in Total
  function mixLtrs(arr) {
    Arr1 = [];
    const Arr = arr;
    const len = arr.length;
    const holdArr = [];
    const tmp = Arr.pop();
    for (let j = 0; j < arr.length + 1; j++) {
      Arr.splice(j, 0, tmp);
      holdArr.push(Arr.slice());
      if (j !== len) {
        Arr.splice(j, 1);
      }
    }
    Arr1 = holdArr.slice();
    Total.push(Arr1);
  }

  // multArrys accept an array of arrays, and calls mixLtrs for each
  function multArrys(arrays) {
    arrays.forEach((elem) => {
      mixLtrs(elem);
    });
    tempTotal = Total.slice();
    Total = [];

    // add a new digit to each element in array, then recurse by calling multArrys
    while (ltrBank.length > 0) {
      const nxtLtr = ltrBank.pop();
      const len = tempTotal[0].length;
      for (let a = 0; a < tempTotal.length; a++) {
        for (let b = 0; b < len; b++) {
          tempTotal[a][b].push(nxtLtr);
        }
      }
      const Totl = [].concat(...tempTotal);
      multArrys(Totl);
    }
  }

  multArrys(Arr1);

  // enforce unique keys in array
  function uniqArry(ar) {
    const uniqKey = {};
    ar.forEach((v) => {
      uniqKey[v] = v;
    });
    return Object.keys(uniqKey).map(v => uniqKey[v].join(''));
  }

  // if all letters in ltrBank utilized, sort, ensure unique and return
  if (ltrBank.length === 0) {
    const Tot = [].concat(...tempTotal);
    Tot.sort();
    const uniqArray = uniqArry(Tot);
    return uniqArray;
  }
  return uniqArry;
}

// usage: console.log(permutations('abcd'));
module.exports = permutations;
