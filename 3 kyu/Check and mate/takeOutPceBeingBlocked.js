const checkPieces = [ [ 'bishop', 1, 4 ], [ 'queen', 0, 7, 0, 6 ] ];
const checkLog = checkPieces;

const replyMoveArray = [ [ 'king', 0, 4, 7, undefined, undefined ],
[ 'pawn', 0, 4, 6, undefined, undefined ],
[ 'pawn', 0, 5, 6, undefined, undefined ],
[ 'knight', 0, 1, 7, undefined, undefined ],
[ 'bishop', 0, 3, 7, undefined, undefined ],
[ 'rook', 0, 5, 7, undefined, undefined ],
[ 'rook', 0, 1, 7, undefined, undefined ] ];

const threatVectors = [ [ [ 2, 5 ], [ 3, 6 ] ], [ [ 1, 7 ], [ 2, 7 ], [ 3, 7 ] ] ]; 
let checkAlreadyBlockingPieceArr = [];

// cycle through the arrays in threatVectors, check if replyMoveArray blocking
(function checkAttackerIsBlocked() {
  const blockPieces = [];
  for (let i = 0; i < replyMoveArray.length; i++) {
    blockPieces.push([replyMoveArray[i][2], replyMoveArray[i][3], replyMoveArray[i][0]]);
  }
  console.log(threatVectors);
  console.log(blockPieces);

  for (let i = 0; i < threatVectors.length; i++) {
    for (let j = 0; j < threatVectors[i].length; j++) {
      for (let k = 0; k < blockPieces.length; k++) {
        if (threatVectors[i][j][0] === blockPieces[k][0] && threatVectors[i][j][1] === blockPieces[k][1]) {
          console.log('Piece blocked');
          threatVectors.splice(i, 1);
          checkAlreadyBlockingPieceArr = blockPieces[k];
          --i;
          break;
        }
      }
    }
  }
  
  if (threatVectors.length === 0) {
    return false;
  }
  
}());
  console.log('threatVectors');
  console.log(threatVectors);
  console.log(checkAlreadyBlockingPieceArr);

  
