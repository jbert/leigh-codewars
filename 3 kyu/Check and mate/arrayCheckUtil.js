const A1 = [[ 3, 7 ], [ 3, 6 ], [ 4, 6 ], [ 5, 6 ], [ 5, 7 ] ];
const A2 = [[ 3, 7 ], [ 3, 6 ], [ 4, 8 ], [ 5, 3 ], [ 5, 7 ] ];

function arrayCheckUtil(arr1, arr2) {
  const Arr1 = arr1;
  const Arr2 = arr2;

  const validMoves = function validMvs() {
    for (let i = 0; i < Arr1.length; i++) {
      const kingMove = Arr1[i].toString();
      for (let j = 0; j < Arr2.length; j++) {
        const thret = Arr2[j].toString();
        if (kingMove === thret) {
          // console.log(kingMove);
          // console.log(pice);
          Arr1.splice(i, 1);
          --i;
          break;
        }
      }
    }
    // console.log(Arr1);
    return Arr1;
  };
  return validMoves();
}

console.log(arrayCheckUtil(A1, A2));
