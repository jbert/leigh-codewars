// was going to copy this into the main app and get ensure working!

const threatVectors = [
  [[2, 5], [3, 6]],
  [[1, 7], [2, 7], [3, 7]],
];

const blockPieces = [[4, 7], [4, 6], [5, 6], [1, 7], [3, 7], [5, 7], [1, 7]];

for (let i = 0; i < threatVectors.length; i++) {
  for (let j = 0; j < threatVectors[i].length; j++) {
    for (let k = 0; k < blockPieces.length; k++) {
      if (threatVectors[i][j].toString() === blockPieces[k].toString()) {
        console.log('Its blocked');
        threatVectors.splice(i, 1);
        --i;
        break;
      }
    }
  }
}

if (threatVectors.length === 0) {
  return false;
}

thatFunc(); 

