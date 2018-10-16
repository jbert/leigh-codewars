const availMoves = [[6, 7], [6, 6], [7, 6]];
const arr = [[6, 7], [6, 6], [7, 6]];

const ownPiecesArr = [
  { piece: 'pawn', x: 6, y: 6 },
  { piece: 'pawn', x: 7, y: 6 },
  { piece: 'king', x: 7, y: 7 },
  { piece: 'knight', x: 6, y: 7 },
];

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < ownPiecesArr.length; j++) {
    if (arr[i][0] === ownPiecesArr[j].x && arr[i][1] === ownPiecesArr[j].y) {
      for (let k = 0; k < availMoves.length; k++) {
        if (availMoves[k][0] === ownPiecesArr[j].x && availMoves[k][1] === ownPiecesArr[j].y) {
          availMoves.splice(k, 1);
          break;
        }
      }
    }
  }
}

console.log(availMoves);
