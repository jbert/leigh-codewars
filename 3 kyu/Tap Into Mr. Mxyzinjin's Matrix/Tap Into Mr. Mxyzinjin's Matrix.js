// next Kata currently under dev, ignore for time being
/*
pseudo code:
function* generator1(possInputString) {
  // need to enclose all in 1 function for a single yield (or have mult generators, too slow)
  loop and cycle through all letters starting with 1st 2 letters, modify permutations()) code (below) here
  yield on a new value.
  if generator1 !== password, restart generator1
  complete the permutations, yielding each one
  cycle next letter.. limiting string for permutations to 2 letters. complete the yields
  grab 1st 3 letters, do above cycling through until used all 3 different characters in the inputString
  loop again
  grab 4th letter etc..
  need to check speed of this solution - can you fire up the 12 services running async or need to run consecutively?
}

/*
Mr. Mxyzinjin has set up 12 new servers where he stores all his new katas. He set up the admin
account with a long, long randomly generated password that consists of uppercase letters,
lowercase letters, numbers and symbols:

abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()`~!@#$%^&*-+=|\{}[]:;"'<>,.?/
You just got hold of his server's login function, which will only return true if the input
matches the password. Your task is to crack and return the passwords on all his servers before
his matrix detects your presence and kicks you out (which happens 12 seconds after you get in, so
be quick!)

Test.describe('Internal test', function() {
  Test.it('Maybe you should break this simple password first before attempting the challenge...',
  function() {
    const passwd = 'mxyzinjin5102';
    const login = makeLogin(passwd);
    Test.assertEquals(crack(login), passwd);
  });
})

*/

/*
function crack(login) {
  return 'mxyzinjin5102';
}
*/

// written solving a previous Kata all permutations of an input string
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

const login = permutations('abcdef');

console.log(login);


/*
crack(login);
*/

// In this kata you have to create all permutations of an input string and remove duplicates, if
// present. This means, you have to shuffle all letters from the input in all possible orders

// Solution uses recursion. Taking first 2 digits, reverses, store both in array, then
// take another digit, and place in every possible position in each array, stores them,
// recurses until all digits added in all positions

/*
Time: 646ms Passed: 0 Failed: 13 Exit Code: 1
Test Results:
 Tapping into Mr. Mxyzinjin's matrix...
 Cracking Mr. Mxyzinjin's server #1: 寅
Expected: 'iz:iwnK=lLQO*E@3-}O$Wk', instead got: 'mxyzinjin5102'
Completed in 1ms
 Cracking Mr. Mxyzinjin's server #2: 酉
Expected: '&,Xh;ST"!$BGbsi\'h', instead got: 'mxyzinjin5102'
 Cracking Mr. Mxyzinjin's server #3: 戌
Expected: '|qTywbuzC7UWe4hZtmlfN{up', instead got: 'mxyzinjin5102'
 Cracking Mr. Mxyzinjin's server #4: 巳
Expected: '&FC|]sif0"(e\'DwanD^+oL"&8EgBCeJxRAO*H)', instead got: 'mxyzinjin5102'
 Cracking Mr. Mxyzinjin's server #5: 子
Expected: '>0%)G8\'C^"T>gP^bnGu1v:^aI|"\\m*.7|)|/~', instead got: 'mxyzinjin5102'
 Cracking Mr. Mxyzinjin's server #6: 申
Expected: '\',trvIz`($Kq1]K7=<Nd?oPr~i&iT$YPK!d)*@0y"dV*V', instead got: 'mxyzinjin5102'
 Cracking Mr. Mxyzinjin's server #7: 未
Expected: 'BAs%~34:HWdEd@T:/|QSvmf"~)N);(?o3:M2z\\A.z\\6Nn.st}3L:\'u.UzRkIvu;BMt`\\]/;
YE3^YpKw-uwn&j', instead got: 'mxyzinjin5102'
 Cracking Mr. Mxyzinjin's server #8: 亥
Expected: 'UvU?"}r>rl316H]7/]g#1m~eMm?Nd1@wVTx9w#cc2k.9[m|43^}pM+[<IE]Vrr|(ea', instead got:
 'mxyzinjin5102'
 Cracking Mr. Mxyzinjin's server #9: 辰
Expected: 'f<>2TZoJK~MF/g|hO{xeez[Lct5UafTP=;KtcUSM44".",UMn~;=|({a\\J7\'}4W/5Dzk(SqEajiud<"
{T4Is-/|`(.d&', instead got: 'mxyzinjin5102'
 Cracking Mr. Mxyzinjin's server #10: 卯
Expected: '`C^@/~D)hN4?$MW?3BnXxecL+W\\t3J!@36|/5{mOj^6;P)n%+Lb5nVd&n$~~b#LhgHY3!,sQ8=4ej~])
  vusc*i82$2j6}7@w3)H%82:Y]G+X\'$`&R4WGNT[n|ol8e+}w;a.rblX?EV#', instead got: 'mxyzinjin5102'
 Cracking Mr. Mxyzinjin's server #11: 丑
Expected: '9>=&vR|zqX-P,IWI.7`ee,Tq)%Myu/;$Db[lcS4VmKKIN({-RTm!]u$F8n*rP8o.A)NWLu-{$L6}Pq+/|
z~9.T3G#eKKHBH%PX9f(Wlmd\\}?iQ*-M-u!:*A0,g&E?m>pR]e=o-JGd]([=O%(dG\\kZG;fUI.IZ|/{tkV1fv|.nZl6R]f^KSP$#Pr\\UD+&', instead got: 'mxyzinjin5102'
 Cracking Mr. Mxyzinjin's server #12: 午
Expected: '2F.5PmU[-YW~d2c6JcOO{7<W0-)X`8\\9%\'YW:xet?`s)2CgP(G/fgPaPsi3RaFs!tr1tX%2o11vspQB4?
  WDNI,js"dFQ,"qk-Ag"hU5pS)a#`DZ-o*Ay<|2Smp@\\JFtb#7;8#5msk!f/:,InU*-tg+uk8r/Q#3E.#C8izN', instead got: 'mxyzinjin5102'
Completed in 7ms
You did not crack all the servers, try again ;-)
 STDERR
Unhandled rejection TestError: Expected: 'iz:iwnK=lLQO*E@3-}O$Wk', instead got: 'mxyzinjin5102'
*/
