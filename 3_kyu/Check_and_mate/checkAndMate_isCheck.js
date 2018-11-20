// instructions below
// some code is identical in isCheck & isMate, in practice reduce the code base I would protect
// under a namespace or module and use Observer pattern or monitor a simple object eg: checkObj
// => {isMate: null} for a change to true/ false & once updated return isMate

function isCheck(Pieces, Player) {
  class NewBoard {
    constructor() {
      this.pieces = Pieces;
      this.player = Player;
      this.state = {
        player0Pieces: [],
        player1Pieces: [],
        defendingKingSquare: [],
        defendableSquares: [],
        threatenedSquares: [],
        inCheckArr: [],
        isMate: false,
      };
    }

    buildBoard() {
      this.pieces.forEach((p) => {
        if (p.owner === 0) {
          this.state.player0Pieces.push(p);
        }
        if (p.owner === 1) {
          this.state.player1Pieces.push(p);
        }
      });
    }

    kingSquareLocator() {
      const defendersSquaresArr = (this.player === 0) ?
        this.state.player0Pieces : this.state.player1Pieces;
      for (let i = 0; i < defendersSquaresArr.length; i++) {
        if (defendersSquaresArr[i].piece === 'king') {
          const { x } = defendersSquaresArr[i];
          const { y } = defendersSquaresArr[i];
          this.state.defendingKingSquare = [x, y];
        }
      }
    }

    determineIfKingIsIncheck() {
      const [x, y] = this.state.defendingKingSquare;
      for (let i = 0; i < this.state.threatenedSquares.length; i++) {
        for (let j = 0; j < this.state.threatenedSquares[i][1].length; j++) {
          if (x === this.state.threatenedSquares[i][1][j][0]
            && y === this.state.threatenedSquares[i][1][j][1]) {
            this.state.inCheckArr.push(this.state.threatenedSquares[i][0]);
          }
        }
      }
    }

    removeAlreadyBlockedPiecesFromCheckArr(board) {
      const [kingX, kingY] = this.state.defendingKingSquare;
      const attackVectors = [];
      // the squares the attacking piece must cover between itself and the King
      (function buildAttackVectors() {
        for (let i = 0; i < board.state.inCheckArr.length; i++) {
          if (board.state.inCheckArr[i].piece === 'rook') {
            const tmpArr = [];
            const { x } = board.state.inCheckArr[i];
            const { y } = board.state.inCheckArr[i];
            if (y === kingY) {
              if (x < kingX) {
                for (let j = x + 1; j < kingX; j++) {
                  tmpArr.push([j, y]);
                }
              }
              if (kingX < x) {
                for (let j = kingX + 1; j < x; j++) {
                  tmpArr.push([j, y]);
                }
              }
            }
            if (x === kingX) {
              if (y > kingY) {
                for (let j = kingY + 1; j < y; j++) {
                  tmpArr.push([x, j]);
                }
              }
              if (kingY > y) {
                for (let j = y + 1; j < kingY; j++) {
                  tmpArr.push([x, j]);
                }
              }
            }
            attackVectors.push([board.state.inCheckArr[i], tmpArr]);
          }

          if (board.state.inCheckArr[i].piece === 'bishop') {
            const tmpArr = [];
            const { x } = board.state.inCheckArr[i];
            const { y } = board.state.inCheckArr[i];

            if (x > kingX && y > kingY) {
              for (let j = kingX + 1, k = kingY + 1; j < x; j++, k++) {
                tmpArr.push([j, k]);
              }
            }
            if (x > kingX && y < kingY) {
              for (let j = kingX + 1, k = kingY - 1; j < x; j++, k--) {
                tmpArr.push([j, k]);
              }
            }
            if (x < kingX && y < kingY) {
              for (let j = kingX - 1, k = kingY - 1; j > x; j--, k--) {
                tmpArr.push([j, k]);
              }
            }
            if (x < kingX && y > kingY) {
              for (let j = kingX - 1, k = kingY + 1; j > x; j--, k++) {
                tmpArr.push([j, k]);
              }
            }
            attackVectors.push([board.state.inCheckArr[i], tmpArr]);
          }

          if (board.state.inCheckArr[i].piece === 'queen') {
            const tmpArr = [];
            const { x } = board.state.inCheckArr[i];
            const { y } = board.state.inCheckArr[i];
            // from rook approach vectors, ie same x or y
            if (y === kingY) {
              if (x < kingX) {
                for (let j = x + 1; j < kingX; j++) {
                  tmpArr.push([j, y]);
                }
              }
              if (kingX < x) {
                for (let j = kingX + 1; j < x; j++) {
                  tmpArr.push([j, y]);
                }
              }
            }
            if (x === kingX) {
              if (y > kingY) {
                for (let j = kingY + 1; j < y; j++) {
                  tmpArr.push([x, j]);
                }
              }
              if (kingY > y) {
                for (let j = y + 1; j < kingY; j++) {
                  tmpArr.push([x, j]);
                }
              }
            }
            // from bishop approach vectors, ie diagonal attack
            if (x > kingX && y > kingY) {
              for (let j = kingX + 1, k = kingY + 1; j < x; j++, k++) {
                tmpArr.push([j, k]);
              }
            }
            if (x > kingX && y < kingY) {
              for (let j = kingX + 1, k = kingY - 1; j < x; j++, k--) {
                tmpArr.push([j, k]);
              }
            }
            if (x < kingX && y < kingY) {
              for (let j = kingX - 1, k = kingY - 1; j > x; j--, k--) {
                tmpArr.push([j, k]);
              }
            }
            if (x < kingX && y > kingY) {
              for (let j = kingX - 1, k = kingY + 1; j > x; j--, k++) {
                tmpArr.push([j, k]);
              }
            }
            attackVectors.push([board.state.inCheckArr[i], tmpArr]);
          }
        }
      }());

      // could refactor the following 'check blocking' functions as very similar although can
      // more easily see what the program is doing kept separate
      // also in 2nd func need to log player's piece as fixed if being in situe blocks an
      // opponents check, player is unable to move it
      (function isAttackerBlockingApproachVector() {
        const playerPieces = (board.player === 0) ?
          board.state.player1Pieces : board.state.player0Pieces;

        const attackV = Array.from(attackVectors);
        for (let i = 0; i < attackV.length; i++) {
          const holdingArray = [];
          for (let j = 0; j < attackV[i][1].length; j++) {
            for (let k = 0; k < playerPieces.length; k++) {
              const { x, y } = playerPieces[k];
              if (JSON.stringify(attackV[i][1][j]) === JSON.stringify([x, y])) {
                holdingArray.push(playerPieces[k]);
                board.state.inCheckArr.splice(k, 1);
              }
            }
          }
        }
        if (board.state.inCheckArr.length === 0) {
          const thisBoard = board;
          thisBoard.state.isMate = false;
        }
      }());
      // is defender already blocking a potential checking piece if moved
      (function isPlayerBlockingApproachVector() {
        const playerPieces = (board.player === 0) ?
          board.state.player0Pieces : board.state.player1Pieces;
        const attackV = Array.from(attackVectors);
        let blockingPiecesHoldingArr = [];
        for (let i = 0; i < playerPieces.length; i++) {
          const { x: ownPieceX, y: ownPieceY } = playerPieces[i];
          for (let j = 0; j < attackV.length; j++) {
            for (let k = 0; k < attackV[j][1].length; k++) {
              if (ownPieceX === attackV[j][1][k][0] && ownPieceY === attackV[j][1][k][1]) {
                // remove the attacking piece from inCheck arrays and attackVectors
                for (let l = 0; l < board.state.inCheckArr.length; l++) {
                  const { x: checkingPieceX, y: checkingPieceY } = board.state.inCheckArr[l];
                  if (checkingPieceX === attackV[j][0].x && checkingPieceY === attackV[j][0].y) {
                    // fixed piece as blocking opponent, in-check otherwise
                    board.state.inCheckArr.splice(l, 1);
                  }
                }
                if (blockingPiecesHoldingArr.length > 1) {
                  blockingPiecesHoldingArr = [];
                  break;
                }
                if (i === playerPieces.length - 1 && j === attackV[j][1].length - 1
                  && blockingPiecesHoldingArr.length === 1) {
                  board.state.fixedPiecesArr.push(playerPieces[i]);
                  attackVectors.splice(j, 1);
                }
              }
            }
          }
        }
        if (board.state.inCheckArr.length === 0) {
          this.state.isMate = false;
        }
      }());
    }
  }

  // object composition factory returns object with methods to create inRange squares
  function threatsOrDefendableSquaresFactory() {
    const protoSquaresInRangeFactory = {
      // buildAll func to build all, although can use components separately
      // playr useful to mock in unit testing (dependency injection)
      buildAll(piecesArray, playr) {
        const totalThreatsorDefendableSquaresArray = [];
        for (let i = 0; i < piecesArray.length; i++) {
          if (piecesArray[i].piece === 'king') {
            this.buildInRangeOfKing(piecesArray[i], totalThreatsorDefendableSquaresArray);
          }
          if (piecesArray[i].piece === 'pawn') {
            this.buildInRangeOfPawn(piecesArray[i], playr, totalThreatsorDefendableSquaresArray);
          }
          if (piecesArray[i].piece === 'knight') {
            this.buildInRangeOfKnight(piecesArray[i], totalThreatsorDefendableSquaresArray);
          }
          if (piecesArray[i].piece === 'rook') {
            this.buildInRangeOfRook(piecesArray[i], totalThreatsorDefendableSquaresArray);
          }
          if (piecesArray[i].piece === 'bishop') {
            this.buildInRangeOfBishop(piecesArray[i], totalThreatsorDefendableSquaresArray);
          }
          if (piecesArray[i].piece === 'queen') {
            this.buildInRangeOfQueen(piecesArray[i], totalThreatsorDefendableSquaresArray);
          }
        }
        return totalThreatsorDefendableSquaresArray;
      },
      buildInRangeOfKing(kingObj, tToDSA) {
        // squares in range of king
        const inRange = [];
        const { x } = kingObj;
        const { y } = kingObj;
        if (x - 1 >= 0) {
          inRange.push([x - 1, y]);
          if (y - 1 >= 0) {
            inRange.push([x - 1, y - 1]);
          }
          if (y + 1 <= 8) {
            inRange.push([x - 1, y + 1]);
          }
        }
        if (x + 1 <= 8) {
          inRange.push([x + 1, y]);
          if (y - 1 >= 0) {
            inRange.push([x + 1, y - 1]);
          }
          if (y + 1 <= 8) {
            inRange.push([x + 1, y + 1]);
          }
        }
        if (y - 1 >= 0) {
          inRange.push([x, y - 1]);
        }
        if (y + 1 <= 8) {
          inRange.push([x, y + 1]);
        }
        tToDSA.push([kingObj, inRange]);
      },
      buildInRangeOfPawn(pawnObj, playr, tToDSA) {
        // in range of pawns
        const inRange = [];
        const { x } = pawnObj;
        const { y } = pawnObj;
        // threats/defense advancing down the board with y increasing
        if (playr === 0) {
          if (x - 1 >= 0) {
            inRange.push([x - 1, y + 1]);
          }
          if (x + 1 <= 7) {
            inRange.push([x + 1, y + 1]);
          }
        }
        // advancing up the board with y decreasing
        if (playr === 1) {
          if ((x - 1) >= 0) {
            inRange.push([x - 1, y - 1]);
          }
          if ((x + 1) <= 7) {
            inRange.push([x + 1, y - 1]);
          }
        }
        tToDSA.push([pawnObj, inRange]);
      },
      buildInRangeOfKnight(knightObj, tToDSA) {
        // squares in range of knight
        const inRange = [];
        const { x } = knightObj;
        const { y } = knightObj;
        if ((x + 2) <= 7 && (y - 1) >= 0) {
          inRange.push([x + 2, y - 1]);
        }
        if ((x + 2) <= 7 && (y + 1) <= 7) {
          inRange.push([x + 2, y + 1]);
        }
        if ((x + 1) <= 7 && (y - 2) >= 0) {
          inRange.push([x + 1, y - 2]);
        }
        if ((x - 1) >= 0 && (y - 2) >= 0) {
          inRange.push([x - 1, y - 2]);
        }
        if ((x - 2) >= 0 && (y - 1) >= 0) {
          inRange.push([x - 2, y - 1]);
        }
        if ((x - 2) >= 0 && (y + 1) <= 7) {
          inRange.push([x - 2, y + 1]);
        }
        if ((x - 1) >= 0 && (y + 2) <= 7) {
          inRange.push([x - 1, y + 2]);
        }
        if ((x + 1) <= 7 && (y + 2) <= 7) {
          inRange.push([x + 1, y + 2]);
        }
        tToDSA.push([knightObj, inRange]);
      },
      buildInRangeOfRook(rookObj, tToDSA) {
        // squares in range of rook
        const inRange = [];
        const { x } = rookObj;
        const { y } = rookObj;
        for (let j = -7; j <= 7; j++) {
          // ignore own square
          if (j === 0) {
            ++j;
          }
          if (x + j >= 0 && x + j <= 7) {
            inRange.push([x + j, y]);
          }
        }
        for (let k = -7; k <= 7; k++) {
          // ignore own square
          if (k === 0) {
            ++k;
          }
          if (y + k >= 0 && y + k <= 7) {
            inRange.push([x, y + k]);
          }
        }
        tToDSA.push([rookObj, inRange]);
      },
      buildInRangeOfBishop(bishopObj, tToDSA) {
        // squares in range of rook
        const inRange = [];
        const { x } = bishopObj;
        const { y } = bishopObj;
        for (let i = 1; i <= 7; i++) {
          if (x + i <= 7 && y + i <= 7) {
            inRange.push([x + i, y + i]);
          }
          if (x + i <= 7 && y - i >= 0) {
            inRange.push([x + i, y - i]);
          }
        }
        for (let i = 1; i <= 7; i++) {
          if (x - i >= 0 && y - i >= 0) {
            inRange.push([x - i, y - i]);
          }
          if (x - i >= 0 && y + i <= 7) {
            inRange.push([x - i, y + i]);
          }
        }
        tToDSA.push([bishopObj, inRange]);
      },
      buildInRangeOfQueen(queenObj, tToDSA) {
        // squares in range of queen => ..RangeOfRook + ..RangeOfBishop combined
        const inRange = [];
        const { x } = queenObj;
        const { y } = queenObj;
        for (let j = -7; j <= 7; j++) {
          // ignore own square
          if (j === 0) {
            ++j;
          }
          if (x + j >= 0 && x + j <= 7) {
            inRange.push([x + j, y]);
          }
        }
        for (let k = -7; k <= 7; k++) {
          // ignore own square
          if (k === 0) {
            ++k;
          }
          if (y + k >= 0 && y + k <= 7) {
            inRange.push([x, y + k]);
          }
        }
        for (let i = 1; i <= 7; i++) {
          if (x + i <= 7 && y + i <= 7) {
            inRange.push([x + i, y + i]);
          }
          if (x + i <= 7 && y - i >= 0) {
            inRange.push([x + i, y - i]);
          }
        }
        for (let i = 1; i <= 7; i++) {
          if (x - i >= 0 && y - i >= 0) {
            inRange.push([x - i, y - i]);
          }
          if (x - i >= 0 && y + i <= 7) {
            inRange.push([x - i, y + i]);
          }
        }
        tToDSA.push([queenObj, inRange]);
      },
    };
    return Object.create(protoSquaresInRangeFactory);
  }

  // logic
  const board = new NewBoard();
  board.buildBoard();
  board.kingSquareLocator();
  const boardThreatenedDefendedSquares = threatsOrDefendableSquaresFactory();
  if (board.player === 0) {
    // build threatened squares, defended squares not needed for isCheck
    board.state.threatenedSquares =
      boardThreatenedDefendedSquares.buildAll(board.state.player1Pieces, 0);
  }
  if (board.player === 1) {
    board.state.threatenedSquares =
      boardThreatenedDefendedSquares.buildAll(board.state.player0Pieces, 1);
  }
  board.determineIfKingIsIncheck();
  if (board.state.inCheckArr.length === 0) {
    return false;
  }
  board.removeAlreadyBlockedPiecesFromCheckArr(board);
  return (board.state.inCheckArr.length === 0) ? false : board.state.inCheckArr;
}

/* if exporting isCheck() and isMate as one module
const checkModule = {};
Object.assign(checkModule, { isCheck, isMate });
module.exports = checkModule;
*/

module.exports = isCheck;

/* usage:

const pieces =
[ { piece: 'king', owner: 1, x: 4, y: 0, },
  { piece: 'bishop', owner: 1, x: 1, y: 4, prevX: 3, prevY: 2, },
  { piece: 'queen', owner: 1, x: 0, y: 7, },
  { piece: 'pawn', owner: 0, x: 4, y: 6, },
  { piece: 'pawn', owner: 0, x: 5, y: 6, },
  { piece: 'rook', owner: 0, x: 1, y: 7, },
  { piece: 'king', owner: 0, x: 4, y: 7, },
  { piece: 'rook', owner: 0, x: 5, y: 7, },
  { piece: 'rook', owner: 1, x: 3, y: 4, }
];

console.log(isCheck(pieces, 0));
*/

/* Instructions:

In this kata, you have to implement two functions: isCheck and isMate.

Both of the functions are given two parameters: player signifies whose turn it is (0: white, 1:
black) and pieces is an array of objects (PHP: Array of associative arrays) describing a piece
and its location in the following fashion:

{
  piece: string, // pawn, rook, knight, bishop, queen or king
  owner: int,    // 0 for white or 1 for black
  x: int,        // 0-7 where 0 is the leftmost column (or "A")
  y: int,        // 0-7 where 0 is the top row (or "8" in the board below)
  prevX: int,    // 0-7, presents this piece's previous x, only given if this is the piece that
  was just moved
  prevY: int     // 0-7, presents this piece's previous y, only given if this is the piece that
  was just moved
}
Top (meaning y equals 0 or 1) is black's home and the bottom (y equals 6 or 7) is white's home,
so the initial board looks like this (the numbers in the parentheses correspond to those used in
the pieces objects fields):

(0)
A (1)
B (2)
C (3)
D (4)
E (5)
F (6)
G (7)
H
(0) 8	♜	♞	♝	♛	♚	♝	♞	♜
(1) 7	♟	♟	♟	♟	♟	♟	♟	♟
(2) 6								
(3) 5								
(4) 4								
(5) 3								
(6) 2	♙	♙	♙	♙	♙	♙	♙	♙
(7) 1	♖	♘	♗	♕	♔	♗	♘	♖

Note: if you do not see correctly the pieces on the board, please install the "Deja Vu Sans" font.

You can assume that the input is a valid chess position. The pieces are not in any particular order.

isCheck should return an array of the objects that threaten the king or false if not threatened (Java: return a Set<Piece> object of the threatening pieces, or an empty set if none are found). (PHP: return an array of associative arrays, false if none are found.)

isMate should return true if the player can't make a move that takes his king out of check, and false if he can make such a move, or if the position is not a check.

To help with debugging, a function outputBoard(pieces) (Java: static method OutputBoard.print(pieces), PHP: outputBoard($pieces), C#: static method void Figures.OutputBoard(IList<Figure> figures)) is provided and will log to console the whole board with all pieces on it. The piece with prevX and prevY properties will appear light gray on the board in the coordinates it used to occupy (Python currently does not support unicode chess symbols, so the standard piece abbreviations KPNBRQ are used. Same representation is used in Java and PHP).

A comprehensive list of how each piece moves can be found at http://en.wikipedia.org/wiki/Chess#Movement.

Note 1: these functions should work in a noninvasive fashion - don't change the contents of the array or values of the pieces contained within it.

Note 2: the tests might not imply explicitly why a certain position is or isn't a check or mate. If your code fails a test, you have to be able to analyze the situation and see which pieces are to blame. If all else fails, try asking for help at the discussion board
*/
