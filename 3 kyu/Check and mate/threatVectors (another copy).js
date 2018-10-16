const availMoves = [[6, 7], [6, 6], [7, 6]];
const ownPiecesArr = [
  { piece: 'pawn', x: 6, y: 6 },
  { piece: 'pawn', x: 7, y: 6 },
  { piece: 'king', x: 7, y: 7 },
  { piece: 'knight', x: 6, y: 7 },
];

for (let i = 0; i < availMoves.length; i++) {
  for (let j = 0; j < ownPiecesArr.length; j++) {
    if (availMoves[i][0] === ownPiecesArr[j].x && availMoves[i][1] === ownPiecesArr[j].y) {
      (availMoves).splice(i, 1);
      i = 0;
      j = 0;
      if (availMoves[i][0] === ownPiecesArr[j].x && availMoves[i][1] === ownPiecesArr[j].y) {
        (availMoves).splice(i, 1);
        i = 0;
        j = 0;
      }
    }
  }
}

console.log(availMoves);
