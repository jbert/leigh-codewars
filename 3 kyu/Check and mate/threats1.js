/*
const people = ['me', 'you', 'them', 'us', 'we', 'other'];
const ppl = ['them', 'we'];
const pl = ['you', 'other'];

// let filteredPeople = [];

const filteredPeople = ppl.filter(element => people.indexOf(element) === -1);
console.log(filteredPeople);

/*
filteredPeople = people.filter(element => ppl.indexOf(element) === -1);

console.log(filteredPeople);

const finished = filteredPeople.filter(element => pl.indexOf(element) === -1);
console.log(finished);
*/
/*
const finished = (people.filter(element => ppl.indexOf(element) === -1)).filter(element => pl.indexOf(element) === -1);
console.log(finished);
*/


const kingMoves = [ [ 3, 7 ], [ 3, 6 ], [ 4, 6 ], [ 5, 6 ], [ 5, 7 ] ];

const Arr = [ [ 4, 7 ], [ 6, 4 ], [ 5, 5 ], [ 4, 6 ], [ 3, 6 ] ];

const km = JSON.stringify(kingMoves[1]);
const ar = JSON.stringify(Arr[4]);

console.log(km);
console.log(ar);

console.log(kingMoves[1] == Arr[4]);
console.log(km === ar);




const movesAvail = (kingMoves.filter((elem) => {
  const possMove = JSON.stringify(elem);
  for (let i = 0; i < Arr.length; i++) {
    const pieceAtSquare = JSON.stringify(Arr[i]);
    if (possMove === pieceAtSquare) {
      return false;
    }
  }
  return true;
}));

console.log(movesAvail);
