const CHESSAPP = {};
CHESSAPP.threats = [ 
[ [ 'queen', 1, 7, 4, 3, 0 ], 1, 1 ],
[ [ 'queen', 1, 7, 4, 3, 0 ], 5, 6 ],
[ [ 'queen', 1, 7, 4, 3, 0 ], 0, 0 ],
];
CHESSAPP.kingX = 4;
CHESSAPP.kingY = 7;
CHESSAPP.player0Pieces = 
[ [ 'king', 0, 4, 7, undefined, undefined ],
  [ 'pawn', 0, 7, 4, undefined, undefined ],
  [ 'pawn', 0, 6, 5, undefined, undefined ],
  [ 'pawn', 0, 7, 6, undefined, undefined ],
  [ 'pawn', 0, 4, 6, undefined, undefined ],
  [ 'pawn', 0, 3, 6, undefined, undefined ],
  [ 'queen', 0, 3, 7, undefined, undefined ],
  [ 'rook', 0, 7, 7, undefined, undefined ],
  [ 'bishop', 0, 5, 7, undefined, undefined ],
  [ 'knight', 0, 6, 7, undefined, undefined ] ];

function isMate(pieces, player) {
  const kingMoves = [];
  const ownPiecesXY = [];
  const threats = [];
  const playr0pcs = [];
  const playr1pcs = [];
  // check if King has any moves that can take out of check, ie within board range, not a square
  // occupied by one of own pieces or a square in threats array
  (function possKingMoves() {
    const x = CHESSAPP.kingX;
    const y = CHESSAPP.kingY;
    if ((x - 1) >= 0) {
      kingMoves.push([x - 1, y]);
      if ((y - 1) >= 0) {
        kingMoves.push([x - 1, y - 1]);
      }
      if ((y + 1) <= 7) {
        kingMoves.push([x - 1, y + 1]);
      }
    }
    if ((y - 1) >= 0) {
      kingMoves.push([x, y - 1]);
      if ((x + 1) <= 7) {
        kingMoves.push([x + 1, y - 1]);
      }
    }
    if ((y + 1) <= 7) {
      kingMoves.push([x, y + 1]);
      if ((x + 1) <= 7) {
        this.threats.push([x + 1, y + 1]);
      }
    }
    if ((x + 1) <= 7) {
      kingMoves.push([x + 1, y]);
    }
  }());

  (function buildOwnPiecesArr() {
      pieces.forEach((p) => {
        if (p.owner === 0) {
          playr0pcs.push([p.piece, 0, p.x, p.y, p.prevX, p.prevY]);
        } else if (p.owner === 1) {
          playr1pcs.push([p.piece, 1, p.x, p.y, p.prevX, p.prevY]);
        }
      });
    (player === 0) ? allPieces = playr0pcs : allPieces = playr1pcs;
    for (let i = 0; i < allPieces.length; i++) {
      ownPiecesXY.push([allPieces[i][2], allPieces[i][3]]);
    }
  }());
  // find positions of all player's current pieces

  (function buildThreats() {
    for (let j = 0; j < CHESSAPP.threats.length; j++) {
      threats.push([CHESSAPP.threats[j][1], CHESSAPP.threats[j][2]]);
    }
  }());

  const kingMvsMinusownPces = (function() {
    const arr1 = kingMoves;
    const arr2 = ownPiecesXY;
    // console.log(arr2);
    const validMoves = function validMvs() {
      for (let i = 0; i < arr1.length; i++) {
        const kingMove = arr1[i].toString();
        for (let j = 0; j < arr2.length; j++) {
          const thret = arr2[j].toString();
          if (kingMove === thret) {
            // console.log(kingMove);
            // console.log(pice);
            arr1.splice(i, 1);
            --i;
            break;
          }
        }
      }
      console.log('KingsMves - own pieces ' + arr1)
      return arr1;
    };
    return validMoves();
  })();

  const escapeMoves = (function() {
    const Arr1 = kingMvsMinusownPces;
    const Arr2 = threats;
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
      console.log('KingsMves - own pieces - threats' + Arr1)
      return Arr1;
    };
    return validMoves();
  })();
  return (escapeMoves.length === 0) ? true : false;
}

const pieces = [
  { piece: 'king', owner: 1, x: 4, y: 0 },
  { piece: 'queen', owner: 1, x: 7, y: 4, prevX: 3, prevY: 0 },
  { piece: 'king', owner: 0, x: 4, y: 7 },
  { piece: 'pawn', owner: 0, x: 7, y: 4 },
  { piece: 'pawn', owner: 0, x: 6, y: 5 },
  { piece: 'pawn', owner: 0, x: 7, y: 6 },
  { piece: 'pawn', owner: 0, x: 4, y: 6 },
  // { piece: 'queen', owner: 0, x: 3, y: 7 },
  { piece: 'pawn', owner: 0, x: 3, y: 6 },
  { piece: 'rook', owner: 0, x: 7, y: 7 },
  { piece: 'bishop', owner: 0, x: 5, y: 7 },
  { piece: 'knight', owner: 0, x: 6, y: 7 },
];

console.log(isMate(pieces, 0));


/*
[
  { piece: 'king', owner: 1, x: 4, y: 0 },
  { piece: 'queen', owner: 1, x: 7, y: 4, prevX: 3, prevY: 0 },
  { piece: 'king', owner: 0, x: 4, y: 7 },
  { piece: 'pawn', owner: 0, x: 7, y: 4 },
  { piece: 'pawn', owner: 0, x: 6, y: 5 },
  { piece: 'pawn', owner: 0, x: 7, y: 6 },
  { piece: 'pawn', owner: 0, x: 4, y: 6 },
  // { piece: 'queen', owner: 0, x: 3, y: 7 },
  { piece: 'pawn', owner: 0, x: 3, y: 6 },
  { piece: 'rook', owner: 0, x: 7, y: 7 },
  { piece: 'bishop', owner: 0, x: 5, y: 7 },
  { piece: 'knight', owner: 0, x: 6, y: 7 },
];
*/
