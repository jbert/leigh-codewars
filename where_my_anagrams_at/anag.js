// There are solutions to this that you can write on 3-4 lines using array.filter and .sort
// eslint advises to stick to simple for to loop through arrays and from timing solutions it does
// run in less than 1/3 the time than the more complex filter / sort operations and is more
// readable. Assuming it calls similar a function under the hood to perform the operation, this is
// a manual solution. This solution simply uses for loop to cycle through each word in Arr, then
// for each word calls wrdCheck which splits into letters and checks each against the anagram,
// removing from anagram once found a match. If reaches last letter in word pushes to wordArr

function anagrams(anagrm, Arr) {
  console.time('timer1');
  let tempArr = [];
  const wordArr = [];

  // cycle through each letter in a word
  function wrdCheck(anag, wrd) {
    for (let i = 0; i < wrd.length; i++) {
      if (!anag.includes(wrd[i])) {
        tempArr = [];
        break;
      }
      if (anag.includes(wrd[i])) {
        anag.splice(anag.indexOf(wrd[i]), 1);
        const ltr = (wrd.splice(wrd.indexOf(wrd[i]), 1));
        --i;
        tempArr.push(ltr[0]);
      }
      if (wrd.length === 0) {
        wordArr.push(tempArr.join(''));
        tempArr = [];
      }
    }
  }
  // cycle through Arr calling wrdCheck for each wrd in Arr
  for (let j = 0; j < Arr.length; j++) {
    const wrd = Arr[j].split('');
    const anag = anagrm.split('');

    wrdCheck(anag, wrd);
  }
  return wordArr;
}

anagrams('abcd', ['aabb', 'abcd', 'bbaa', 'dada']);
console.timeEnd('timer1');

// running at 0.25ms
