// Instructions below

// Returns an array of threats if the arrangement of the pieces is check, otherwise false
function isCheck(pieces, Player) {
  class NewBoard {
    constructor(Pieces) {
      this.pieces = Pieces;
      this.player0Pieces = [];
      this.player1Pieces = [];
      this.player = Player;
      this.threats = [];
      this.check = [];
    }

    buildBoard() {
      pieces.forEach((p) => {
        if (p.owner === 0) {
          this.player0Pieces.push([p.piece, 0, p.x, p.y, p.prevX, p.prevY]);
        } else if (p.owner === 1) {
          this.player1Pieces.push([p.piece, 1, p.x, p.y, p.prevX, p.prevY]);
        }
      });
      // console.log(this.player0Pieces);
      // console.log(this.player1Pieces);
      this.threatCheck();
    }

    threatCheck() {
      return ((this.player === 0) ? this.buildThreats(this.player1Pieces) :
        this.buildThreats(this.player0Pieces));
    }

    buildThreats(pcsArr) {
      for (let i = 0; i < pcsArr.length; i++) {
        if (pcsArr[i][0] === 'king') {
          const x = pcsArr[i][2];
          const y = pcsArr[i][3];
          // squares threatened by king
          if ((x - 1) >= 0) {
            this.threats.push([pcsArr[i], x - 1, y]);
            if ((y - 1) >= 0) {
              this.threats.push([pcsArr[i], x - 1, y - 1]);
            }
            if ((y + 1) <= 7) {
              this.threats.push([pcsArr[i], x - 1, y + 1]);
            }
          }
          if ((y - 1) >= 0) {
            this.threats.push([pcsArr[i], x, y - 1]);
            if ((x + 1) <= 7) {
              this.threats.push([pcsArr[i], x + 1, y - 1]);
            }
          }
          if ((y + 1) <= 7) {
            this.threats.push([pcsArr[i], x, y + 1]);
            if ((x + 1) <= 7) {
              this.threats.push([pcsArr[i], x + 1, y + 1]);
            }
          }
          if ((x + 1) <= 7) {
            this.threats.push([pcsArr[i], x + 1, y]);
          }
        }
        // squares threatened by pawns
        if (pcsArr[i][0] === 'pawn') {
          const x = pcsArr[i][2];
          const y = pcsArr[i][3];
          // by player 1
          if (this.player === 0) {
            if ((x - 1) >= 0) {
              this.threats.push([pcsArr[i], x - 1, y + 1]);
            }
            if ((x + 1) <= 7) {
              this.threats.push([pcsArr[i], x + 1, y + 1]);
            }
          }
          // of player 0
          if (this.player === 1) {
            if ((x - 1) >= 0) {
              this.threats.push([pcsArr[i], x - 1, y - 1]);
            }
            if ((x + 1) <= 7) {
              this.threats.push([pcsArr[i], x + 1, y - 1]);
            }
          }
        }
        // squares threatened by rooks
        // could put in code here to remove the 'in shadow' squares protected by other pieces
        if (pcsArr[i][0] === 'rook') {
          const x = pcsArr[i][2];
          const y = pcsArr[i][3];
          for (let j = -7; j < 7; j++) {
            // ignore own square
            if (j === 0) {
              ++j;
            }
            if (x + j >= 0 && x + j <= 7) {
              this.threats.push([pcsArr[i], x + j, y]);
            }
          }
          for (let k = -7; k < 7; k++) {
            // ignore own square
            if (k === 0) {
              ++k;
            }
            if (y + k >= 0 && y + k <= 7) {
              this.threats.push([pcsArr[i], x, y + k]);
            }
          }
        }
        // squares threatened by bishops
        // could put in code here to remove the 'in shadow' squares protected by other pieces
        if (pcsArr[i][0] === 'bishop') {
          const x = pcsArr[i][2];
          const y = pcsArr[i][3];
          for (let j = -7; j < 7; j++) {
            // ignore own square
            if (j === 0) {
              ++j;
            }
            if (x + j >= 0 && x + j <= 7) {
              this.threats.push([pcsArr[i], x + j, y + j]);
            }
          }
          for (let k = -7; k < 7; k++) {
            // ignore own square
            if (k === 0) {
              ++k;
            }
            if (x - k >= 0 && x - k <= 7 && y + k >= 0) {
              this.threats.push([pcsArr[i], x - k, y + k]);
            }
          }
        }
        // squares threatened by knights
        if (pcsArr[i][0] === 'knight') {
          const x = pcsArr[i][2];
          const y = pcsArr[i][3];
          if ((x + 2) <= 7 && (y - 1) >= 0) {
            this.threats.push([pcsArr[i], x + 2, y - 1]);
          }
          if ((x + 2) <= 7 && (y + 1) <= 7) {
            this.threats.push([pcsArr[i], x + 2, y + 1]);
          }
          if ((x + 1) <= 7 && (y - 2) >= 0) {
            this.threats.push([pcsArr[i], x + 1, y - 2]);
          }
          if ((x - 1) >= 0 && (y - 2) >= 0) {
            this.threats.push([pcsArr[i], x - 1, y - 2]);
          }
          if ((x - 2) >= 0 && (y - 1) >= 0) {
            this.threats.push([pcsArr[i], x - 2, y - 1]);
          }
          if ((x - 2) >= 0 && (y + 1) <= 7) {
            this.threats.push([pcsArr[i], x - 2, y + 1]);
          }
          if ((x - 1) >= 0 && (y + 2) <= 7) {
            this.threats.push([pcsArr[i], x - 1, y + 2]);
          }
          if ((x + 1) <= 7 && (y + 2) <= 7) {
            this.threats.push([pcsArr[i], x + 1, y + 2]);
          }
        }
        // squares threatened by queens
        // could put in code here to remove the 'in shadow' squares protected by other pieces
        if (pcsArr[i][0] === 'queen') {
          const x = pcsArr[i][2];
          const y = pcsArr[i][3];
          for (let j = -7; j < 7; j++) {
            // ignore own square
            if (j === 0) {
              ++j;
            }
            if (x + j >= 0 && x + j <= 7) {
              this.threats.push([pcsArr[i], x + j, y]);
            }
          }
          for (let k = -7; k < 7; k++) {
            // ignore own square
            if (k === 0) {
              ++k;
            }
            if (y + k >= 0 && y + k <= 7) {
              this.threats.push([pcsArr[i], x, y + k]);
            }
          }
          for (let j = -7; j < 7; j++) {
            // ignore own square
            if (j === 0) {
              ++j;
            }
            if (x + j >= 0 && x + j <= 7) {
              this.threats.push([pcsArr[i], x + j, y + j]);
            }
          }
          for (let k = -7; k < 7; k++) {
            // ignore own square
            if (k === 0) {
              ++k;
            }
            if (x - k >= 0 && x - k <= 7 && y + k >= 0) {
              this.threats.push([pcsArr[i], x - k, y + k]);
            }
          }
        }
      }
      // console.log('this.threats');
      // console.log(this.threats);
      return (this.threats);
    }
  }

  const board = new NewBoard();

  function checkCheck() {
    let kingX;
    let kingY;
    let arr;
    let plyr = 0;
    (Player === 0) ? arr = board.player0Pieces : arr = board.player1Pieces;

    for (let j = 0; j < arr.length; j++) {
      if (arr[j][0] === 'king') {
        kingX = arr[j][2];
        kingY = arr[j][3];
      }
    }
    // console.log(kingX, kingY);
    for (let l = 0; l < board.threats.length; l++) {
      if (board.threats[l][1] === kingX && board.threats[l][2] === kingY) {
        if (Player === 0) {
          plyr = 1;
        }
        const map = new Map([['piece', board.threats[l][0][0]], ['owner', plyr], ['x', board.threats[l][0][2]], ['y', board.threats[l][0][3]]]);
        if (board.threats[l][0][4] !== undefined) {
          map.set('prevX', board.threats[l][0][4]);
        }
        if (board.threats[l][0][5] !== undefined) {
          map.set('prevY', board.threats[l][0][5]);
        }

        /*
        const chkObj = {};
        for (const [key, value] of map) {
          Object.assign(chkObj, [key, value]);
        }
        */
        const chkObj = Array.from(map).reduce((chkObj, [key, value]) => (
          Object.assign(chkObj, { [key]: value })), {});
        /*
        const chkObj = Object.assign({
          piece: board.threats[l][0][0],
          owner: plyr,
          x: board.threats[l][0][2],
          y: board.threats[l][0][3],
          [(board.threats[l][0][4] === undefined) ? null : 'prevX']: board.threats[l][0][4],
          [(board.threats[l][0][5] === undefined) ? null : 'prevY']: board.threats[l][0][5],
        });
        */
        // console.log(map);
        // console.log(chkObj);
        (board.check).push(chkObj);
      }
    }
    return board.check;
  }

  board.buildBoard(pieces);
  checkCheck();
  return board.check;
}

pieces = [
  {piece: "king", owner: 1, x: 4, y: 0},
  {piece: "king", owner: 0, x: 4, y: 7},
  {piece: "rook", owner: 1, x: 4, y: 1, prevX: 2, prevY: 1},
  {piece: "queen", owner: 1, x: 2, y: 7},
  {piece: 'knight', owner: 1, x: 3, y: 5 },
];

console.log(isCheck(pieces, 0));

/*
function isCheck(pieces, player) {
}

// Returns true if the arrangement of the
// pieces is a check mate, otherwise false
function isMate(pieces, player) {
}
*/


//

// expected: [{ piece: \'pawn\', owner: 1, x: 5, y: 6 }]

/*
In this kata, you have to implement two functions: isCheck and isMate.

Both of the functions are given two parameters: player signifies whose turn it is
(0: white, 1: black) and pieces is an array of objects describing a piece and its
location in the following fashion:

{
  piece: string, // pawn, rook, knight, bishop, queen or king
  owner: int,    // 0 for white or 1 for black
  x: int,        // 0-7 where 0 is the leftmost column (or "A")
  y: int,        // 0-7 where 0 is the top row (or "8" in the board below)
  prevX: int,    // 0-7, presents this piece's previous x, only given if this is the piece
  that was just moved
  prevY: int     // 0-7, presents this piece's previous y, only given if this is the piece
  that was just moved
}

Top (meaning y equals 0 or 1) is black's home and the bottom (y equals 6 or 7) is white's home
so the initial board looks like this (the numbers in the parentheses correspond to those used
in the pieces objects fields):

      A B C D E F G H
      0 1 2 3 4 5 6 7
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

isCheck should return an array of the objects that threaten the king or false if not threatened
(Java: return a Set<Piece> object of the threatening pieces, or an empty set if none are found).
(PHP: return an array of associative arrays, false if none are found.)

isMate should return true if the player can't make a move that takes his king out of check, and
false if he can make such a move, or if the position is not a check.

To help with debugging, a function outputBoard(pieces) (Java: static method OutputBoard.
print(pieces). PHP: outputBoard($pieces)
C#: static method void Figures.OutputBoard(IList<Figure> figures))
is provided and will log to console the whole board with all pieces on it.
The piece with prevX and prevY properties will appear light gray on the board in the coordinates
it used to occupy (Python currently does not support unicode chess symbols, so the standard piece
abbreviations KPNBRQ are used. Same representation is used in Java and PHP).

A comprehensive list of how each piece moves can be found at
http://en.wikipedia.org/wiki/Chess#Movement

Note 1: these functions should work in a noninvasive fashion - don't change the contents of the array
or values of the pieces contained within it.

Note 2: the tests might not imply explicitly why a certain position is or isn't a check or mate.
If your code fails a test, you have to be able to analyze the situation and see which pieces are to
blame. If all else fails, try asking for help at the discussion board
*/
