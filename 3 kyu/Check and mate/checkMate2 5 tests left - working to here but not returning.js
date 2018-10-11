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

    buildThreats(pcsArr) {
      for (let i = 0; i < pcsArr.length; i++) {
        if (pcsArr[i][0] === 'king') {
          const x = pcsArr[i][2];
          const y = pcsArr[i][3];
          // squares threatened by player's king
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
        // squares threatened by player's pawns
        if (pcsArr[i][0] === 'pawn') {
          const x = pcsArr[i][2];
          const y = pcsArr[i][3];
          // player 1's
          if (this.player === 0) {
            if ((x - 1) >= 0) {
              this.threats.push([pcsArr[i], x - 1, y + 1]);
            }
            if ((x + 1) <= 7) {
              this.threats.push([pcsArr[i], x + 1, y + 1]);
            }
          }
          // player 0's
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
      return (this.threats);
    }

    threatCheck() {
      return ((this.player === 0) ? this.buildThreats(this.player1Pieces) :
        this.buildThreats(this.player0Pieces));
    }

    buildBoard() {
      pieces.forEach((p) => {
        if (p.owner === 0) {
          this.player0Pieces.push([p.piece, 0, p.x, p.y, p.prevX, p.prevY]);
        } else if (p.owner === 1) {
          this.player1Pieces.push([p.piece, 1, p.x, p.y, p.prevX, p.prevY]);
        }
      });
      console.log('This.player0Pieces');
      console.log(this.player0Pieces);
      // console.log(this.player1Pieces);
      this.threatCheck();
    }
  }

  const board = new NewBoard();

  function checkCheck() {
    let kingX;
    let kingY;
    let arr;
    let plyr = 0;
    (Player === 0) ? arr = board.player0Pieces : arr = board.player1Pieces;
    // find the king's position of player who's turn it is
    for (let j = 0; j < arr.length; j++) {
      if (arr[j][0] === 'king') {
        kingX = arr[j][2];
        kingY = arr[j][3];
      }
    }
    // if threatened square equals king's square
    for (let l = 0; l < board.threats.length; l++) {
      if (board.threats[l][1] === kingX && board.threats[l][2] === kingY) {
        if (Player === 0) {
          plyr = 1;
        }
        // build a Map of threats
        const map = new Map([['piece', board.threats[l][0][0]], ['owner', plyr], ['x', board.threats[l][0][2]], ['y', board.threats[l][0][3]]]);
        if (board.threats[l][0][4] !== undefined) {
          map.set('prevX', board.threats[l][0][4]);
        }
        if (board.threats[l][0][5] !== undefined) {
          map.set('prevY', board.threats[l][0][5]);
        }

        const chkObj = Array.from(map).reduce((chkObj, [key, value]) => (
          Object.assign(chkObj, { [key]: value })), {});

        (board.check).push(chkObj);
      }
    }
    return board.check;
  }

  board.buildBoard(pieces);
  checkCheck();
  // return board.check or if player's King not in check return false
  if (board.check.length !== 0) {
    return board.check;
  }
  return false;
}

function isMate(pieces, Player) {
  class NewBoard {
    constructor(Pieces) {
      this.pieces = Pieces;
      this.player0Pieces = [];
      this.player1Pieces = [];
      this.player = Player;
      this.threats = [];
      this.check = [];
      this.checkPieces = [];
    }

    buildThreats(pcsArr) {
      for (let i = 0; i < pcsArr.length; i++) {
        if (pcsArr[i][0] === 'king') {
          const x = pcsArr[i][2];
          const y = pcsArr[i][3];
          // squares threatened by player's king
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
        // squares threatened by player's pawns
        if (pcsArr[i][0] === 'pawn') {
          const x = pcsArr[i][2];
          const y = pcsArr[i][3];
          // player 1's
          if (this.player === 0) {
            if ((x - 1) >= 0) {
              this.threats.push([pcsArr[i], x - 1, y + 1]);
            }
            if ((x + 1) <= 7) {
              this.threats.push([pcsArr[i], x + 1, y + 1]);
            }
          }
          // player 0's
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
      return (this.threats);
    }

    threatCheck() {
      return ((this.player === 0) ? this.buildThreats(this.player1Pieces) :
        this.buildThreats(this.player0Pieces));
    }

    buildBoard() {
      pieces.forEach((p) => {
        if (p.owner === 0) {
          this.player0Pieces.push([p.piece, 0, p.x, p.y, p.prevX, p.prevY]);
        } else if (p.owner === 1) {
          this.player1Pieces.push([p.piece, 1, p.x, p.y, p.prevX, p.prevY]);
        }
      });
      // console.log('This.player0Pieces');
      // console.log(this.player0Pieces);
      // console.log(this.player1Pieces);
      this.threatCheck();
    }
  }

  const board = new NewBoard();

  function checkCheck() {
    let kingX;
    let kingY;
    let arr;
    let plyr = 0;
    (Player === 0) ? arr = board.player0Pieces : arr = board.player1Pieces;
    // find the king's position of player who's turn it is
    for (let j = 0; j < arr.length; j++) {
      if (arr[j][0] === 'king') {
        board.kingX = arr[j][2];
        board.kingY = arr[j][3];
        break;
      }
    }
    // if threatened square equals king's square
    for (let l = 0; l < board.threats.length; l++) {
      if (board.threats[l][1] === board.kingX && board.threats[l][2] === board.kingY) {
        board.checkPieces.push([board.threats[l][0][0], board.threats[l][0][2], board.threats[l][0][3]]);

        if (board.threats[l][0][4] !== undefined) {
          board.checkPieces[board.checkPieces.length - 1].push(board.threats[l][0][4]);
        }
        if (board.threats[l][0][5] !== undefined) {
          board.checkPieces[board.checkPieces.length - 1].push(board.threats[l][0][5]);
        }

        // console.log('board.checkPieces');
        // console.log(board.checkPieces);
      }
    }
    return (board.checkPieces.length > 0);
  }
  board.buildBoard(pieces);
  checkCheck();
  // if player's King not in check return false
  if (board.check.length > 0) {
    return true;
  }

  const kingMoves = [];
  // check if King has any moves that can take out of check, ie within board range, not a square
  // occupied by one of own pieces or a square in threats array
  (function possKingMoves() {
    const x = board.kingX;
    const y = board.kingY;
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
        board.threats.push([x + 1, y + 1]);
      }
    }
    if ((x + 1) <= 7) {
      kingMoves.push([x + 1, y]);
    }
  }());

  const kingMvsMinusownPces = (function minusOwnPcs() {
    const arr1 = kingMoves;
    console.log('kingMoves');
    console.log(arr1);
    const plPcs = (Player === 0) ? board.player0Pieces : board.player1Pieces;
    const validMoves = function validMvs() {
      for (let i = 0; i < arr1.length; i++) {
        const kingMove = JSON.stringify(arr1[i]);
        for (let j = 0; j < plPcs.length; j++) {
          const arr2 = [plPcs[j][2], plPcs[j][3]];
          const thret = JSON.stringify(arr2);
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
  }());

  // func name appears repeated but is useful for stack trace and recursion
  function takeOrBlockOrEnPassant() {
    const replyMoveArray = (Player === 0) ? board.player0Pieces : board.player1Pieces;
    const threatVectors = [];
    const responsePieceRangeArr = [];
    let checkAlreadyBlockingPieceArr = [];

    function takePieceCheck() {
      for (let k = 0; k < responsePieceRangeArr.length; k++) {
        if (responsePieceRangeArr[k][1] === threatVectors[0][2][1] && responsePieceRangeArr[k][2] === threatVectors[0][2][2]) {
          console.log('Not checkmate, able to take the threat');
          return false;
        }
      }
    }

    function removeThreatsbyBlockedPieces() {
      // remove the blocking pieces from responseRangeArr
      for (let i = 0; i < checkAlreadyBlockingPieceArr.length; i++) {
        for (let j = 0; j < responsePieceRangeArr.length; j++) {
          if (checkAlreadyBlockingPieceArr[i][2] === responsePieceRangeArr[j][0][0] && checkAlreadyBlockingPieceArr[i][0] === responsePieceRangeArr[j][0][2] && checkAlreadyBlockingPieceArr[i][1] === responsePieceRangeArr[j][0][3]) {
            responsePieceRangeArr.splice(j, 1);
            j--;
          }
        }
        console.log('responsePieceRangeArr');
        console.log(responsePieceRangeArr);
      }
      return takePieceCheck();
    }

    console.log('replyMoveArray');
    console.log(replyMoveArray);

    function playerTakesThreat() {
      // this is returned from checkAttackerIsBlocked()
      // remaining threatVectors piece in range of attack of any of own pieces?
      // just finishing this func, to build attack range of own current pieces and compare with
      // threatVectors - to see if can take the piece, or if not, if can block it?

      (function responseMoveTakePiece() {
        for (let i = 0; i < replyMoveArray.length; i++) {
          if (replyMoveArray[i][0] === 'king') {
            const x = replyMoveArray[i][2];
            const y = replyMoveArray[i][3];
            // squares in range of player's king
            if ((x - 1) >= 0) {
              responsePieceRangeArr.push([replyMoveArray[i], x - 1, y]);
              if ((y - 1) >= 0) {
                responsePieceRangeArr.push([replyMoveArray[i], x - 1, y - 1]);
              }
              if ((y + 1) <= 7) {
                responsePieceRangeArr.push([replyMoveArray[i], x - 1, y + 1]);
              }
            }
            if ((y - 1) >= 0) {
              responsePieceRangeArr.push([replyMoveArray[i], x, y - 1]);
              if ((x + 1) <= 7) {
                responsePieceRangeArr.push([replyMoveArray[i], x + 1, y - 1]);
              }
            }
            if ((y + 1) <= 7) {
              responsePieceRangeArr.push([replyMoveArray[i], x, y + 1]);
              if ((x + 1) <= 7) {
                responsePieceRangeArr.push([replyMoveArray[i], x + 1, y + 1]);
              }
            }
            if ((x + 1) <= 7) {
              responsePieceRangeArr.push([replyMoveArray[i], x + 1, y]);
            }
          }
          // squares threatened by player's pawns
          if (replyMoveArray[i][0] === 'pawn') {
            const x = replyMoveArray[i][2];
            const y = replyMoveArray[i][3];
            // player 1's
            if (Player === 0) {
              if ((x - 1) >= 0) {
                responsePieceRangeArr.push([replyMoveArray[i], x - 1, y + 1]);
              }
              if ((x + 1) <= 7) {
                responsePieceRangeArr.push([replyMoveArray[i], x + 1, y + 1]);
              }
            }
            // player 0's
            if (this.player === 1) {
              if ((x - 1) >= 0) {
                responsePieceRangeArr.push([replyMoveArray[i], x - 1, y - 1]);
              }
              if ((x + 1) <= 7) {
                responsePieceRangeArr.push([replyMoveArray[i], x + 1, y - 1]);
              }
            }
          }
          // squares threatened by rooks
          // could put in code here to remove the 'in shadow' squares protected by other pieces
          if (replyMoveArray[i][0] === 'rook') {
            const x = replyMoveArray[i][2];
            const y = replyMoveArray[i][3];
            for (let j = -7; j < 7; j++) {
              // ignore own square
              if (j === 0) {
                ++j;
              }
              if (x + j >= 0 && x + j <= 7) {
                responsePieceRangeArr.push([replyMoveArray[i], x + j, y]);
              }
            }
            for (let k = -7; k < 7; k++) {
              // ignore own square
              if (k === 0) {
                ++k;
              }
              if (y + k >= 0 && y + k <= 7) {
                responsePieceRangeArr.push([replyMoveArray[i], x, y + k]);
              }
            }
          }
          // squares threatened by bishops
          // could put in code here to remove the 'in shadow' squares protected by other pieces
          if (replyMoveArray[i][0] === 'bishop') {
            const x = replyMoveArray[i][2];
            const y = replyMoveArray[i][3];
            for (let j = -7; j < 7; j++) {
              // ignore own square
              if (j === 0) {
                ++j;
              }
              if (x + j >= 0 && x + j <= 7) {
                responsePieceRangeArr.push([replyMoveArray[i], x + j, y + j]);
              }
            }
            for (let k = -7; k < 7; k++) {
              // ignore own square
              if (k === 0) {
                ++k;
              }
              if (x - k >= 0 && x - k <= 7 && y + k >= 0) {
                responsePieceRangeArr.push([replyMoveArray[i], x - k, y + k]);
              }
            }
          }
          // squares threatened by knights
          if (replyMoveArray[i][0] === 'knight') {
            const x = replyMoveArray[i][2];
            const y = replyMoveArray[i][3];
            if ((x + 2) <= 7 && (y - 1) >= 0) {
              responsePieceRangeArr.push([replyMoveArray[i], x + 2, y - 1]);
            }
            if ((x + 2) <= 7 && (y + 1) <= 7) {
              responsePieceRangeArr.push([replyMoveArray[i], x + 2, y + 1]);
            }
            if ((x + 1) <= 7 && (y - 2) >= 0) {
              responsePieceRangeArr.push([replyMoveArray[i], x + 1, y - 2]);
            }
            if ((x - 1) >= 0 && (y - 2) >= 0) {
              responsePieceRangeArr.push([replyMoveArray[i], x - 1, y - 2]);
            }
            if ((x - 2) >= 0 && (y - 1) >= 0) {
              responsePieceRangeArr.push([replyMoveArray[i], x - 2, y - 1]);
            }
            if ((x - 2) >= 0 && (y + 1) <= 7) {
              responsePieceRangeArr.push([replyMoveArray[i], x - 2, y + 1]);
            }
            if ((x - 1) >= 0 && (y + 2) <= 7) {
              responsePieceRangeArr.push([replyMoveArray[i], x - 1, y + 2]);
            }
            if ((x + 1) <= 7 && (y + 2) <= 7) {
              responsePieceRangeArr.push([replyMoveArray[i], x + 1, y + 2]);
            }
          }
          // squares threatened by queens
          // could put in code here to remove the 'in shadow' squares protected by other pieces
          if (replyMoveArray[i][0] === 'queen') {
            const x = replyMoveArray[i][2];
            const y = replyMoveArray[i][3];
            for (let j = -7; j < 7; j++) {
              // ignore own square
              if (j === 0) {
                ++j;
              }
              if (x + j >= 0 && x + j <= 7) {
                responsePieceRangeArr.push([replyMoveArray[i], x + j, y]);
              }
            }
            for (let k = -7; k < 7; k++) {
              // ignore own square
              if (k === 0) {
                ++k;
              }
              if (y + k >= 0 && y + k <= 7) {
                responsePieceRangeArr.push([replyMoveArray[i], x, y + k]);
              }
            }
            for (let j = -7; j < 7; j++) {
              // ignore own square
              if (j === 0) {
                ++j;
              }
              if (x + j >= 0 && x + j <= 7) {
                responsePieceRangeArr.push([replyMoveArray[i], x + j, y + j]);
              }
            }
            for (let k = -7; k < 7; k++) {
              // ignore own square
              if (k === 0) {
                ++k;
              }
              if (x - k >= 0 && x - k <= 7 && y + k >= 0) {
                responsePieceRangeArr.push([replyMoveArray[i], x - k, y + k]);
              }
            }
          }
        }
        return removeThreatsbyBlockedPieces();
      }());
      console.log('responsePieceRangeArr');
      console.log(responsePieceRangeArr);
      console.log('threatVectors');
      console.log(threatVectors);
    }


    // cycle through the arrays in threatVectors, check if replyMoveArray blocking
    function checkAttackerIsBlocked() {
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
              checkAlreadyBlockingPieceArr.push(blockPieces[k]);
              --i;
              break;
            }
          }
        }
      }
      
      if (threatVectors.length === 0) {
        return false;
      }
      
      console.log('threatVectors');
      console.log(threatVectors);
      console.log('checkAlreadyBlockingPieceArr');
      console.log(checkAlreadyBlockingPieceArr);

      console.log(board.checkPieces);

      // program is terminating here (ish)
      // am going to point to playerTakesThreat, then if not possible, playerBlocks with another piece
      return playerTakesThreat();
    }

    (function buildAttackVectors() {
      for (let i = 0; i < board.checkPieces.length; i++) {
        if (board.checkPieces[i][0] === 'rook') {
          const tmpArr = [];
          const x = board.checkPieces[i][1];
          const y = board.checkPieces[i][2];
          if (y === board.kingY) {
            if (x < board.kingX) {
              for (let j = x + 1; j < board.kingX; j++) {
                tmpArr.push([j, y]);
              }
              tmpArr.push(board.checkPieces[i]);
            }
            if (board.kingX < x) {
              for (let j = board.kingX + 1; j < x; j++) {
                tmpArr.push([j, y]);
              }
              tmpArr.push(board.checkPieces[i]);
            }
          }
          if (x === board.kingX) {
            if (y > board.kingY) {
              for (let j = board.kingY + 1; j < y; j++) {
                tmpArr.push([x, j]);
              }
              tmpArr.push(board.checkPieces[i]);
            }
            if (board.kingY > y) {
              for (let j = y + 1; j < board.kingY; j++) {
                tmpArr.push([x, j]);
              }
              tmpArr.push(board.checkPieces[i]);
            }
          }
          threatVectors.push(tmpArr);
        }
    
        if (board.checkPieces[i][0] === 'bishop') {
          const tmpArr = [];
          const x = board.checkPieces[i][1];
          const y = board.checkPieces[i][2];
          if (board.kingX > x && board.kingY > y) {
            let Y = y;
            for (let j = x + 1; j < board.kingX; j++) {
              tmpArr.push([j, Y += 1]);
            }
            tmpArr.push(board.checkPieces[i]);
          }
          if (board.kingX > x && board.kingY < y) {
            let Y = y;
            for (let j = x + 1; j < board.kingX; j++) {
              tmpArr.push([j, Y -= 1]);
            }
            tmpArr.push(board.checkPieces[i]);
          }
    
          if (board.kingX < x && board.kingY > y) {
            let kingX = board.kingX;
            let kingY = board.kingY;
            for (let j = kingX + 1; j < x; j++) {
              tmpArr.push([j, kingY -= 1]);
            }
            tmpArr.push(board.checkPieces[i]);
          }
          if (board.kingX < x && board.kingY < y) {
            let kingY = board.kingY;
            for (let j = board.kingX + 1; j < x; j++) {
              tmpArr.push([j, kingY += 1]);
            }
            tmpArr.push(board.checkPieces[i]);
          }
          threatVectors.push(tmpArr);
        }
    
        if (board.checkPieces[i][0] === 'queen') {
          const tmpArr = [];
          const x = board.checkPieces[i][1];
          const y = board.checkPieces[i][2];
          // horizontal & vertical attack vectors
          if (y === board.kingY) {
            if (x < board.kingX) {
              for (let j = x + 1; j < board.kingX; j++) {
                tmpArr.push([j, y]);
              }
              tmpArr.push(board.checkPieces[i]);
            }
            if (board.kingX < x) {
              for (let j = board.kingX + 1; j < x; j++) {
                tmpArr.push([j, y]);
              }
              tmpArr.push(board.checkPieces[i]);
            }
          }
          if (x === board.kingX) {
            if (y > board.kingY) {
              for (let j = board.kingY + 1; j < y; j++) {
                tmpArr.push([x, j]);
              }
              tmpArr.push(board.checkPieces[i]);
            }
            if (board.kingY > y) {
              for (let j = y + 1; j < board.kingY; j++) {
                tmpArr.push([x, j]);
              }
              tmpArr.push(board.checkPieces[i]);
            }
          }
          // diagonal attack threat vectors
          if (board.kingX > x && board.kingY > y) {
            for (let j = x + 1; j < board.kingX; j++) {
              tmpArr.push([j, j]);
            }
            tmpArr.push(board.checkPieces[i]);
          }
          if (board.kingX > x && board.kingY < y) {
            let Y = y;
            for (let j = x + 1; j < board.kingX; j++) {
              tmpArr.push([j, Y -= 1]);
            }
            tmpArr.push(board.checkPieces[i]);
          }
          if (board.kingX < x && board.kingY > y) {
            let kingX = board.kingX;
            let kingY = board.kingY;
            for (let j = kingX + 1; j < x; j++) {
              tmpArr.push([j, kingY -= 1]);
            }
            tmpArr.push(board.checkPieces[i]);
          }
          if (board.kingX < x && board.kingY < y) {
            let kingY = board.kingY;
            for (let j = board.kingX + 1; j < x; j++) {
              tmpArr.push([j, kingY += 1]);
            }
            tmpArr.push(board.checkPieces[i]);
          }
          threatVectors.push(tmpArr);
        }
      }
      checkAttackerIsBlocked();
    }());
  }

  const escapeMoves = function escapeMvs() {
    const Arr1 = kingMvsMinusownPces;
    const Arr2 = board.threats;
    const validMoves = function validMvs() {
      for (let i = 0; i < Arr1.length; i++) {
        const kingMove = Arr1[i].toString();
        for (let j = 0; j < Arr2.length; j++) {
          const thret = [Arr2[j][1], Arr2[j][2]].toString();
          if (kingMove === thret) {
            // console.log(kingMove);
            // console.log(pice);
            Arr1.splice(i, 1);
            --i;
            break;
          }
        }
      }
      console.log('KingsMves - own pieces - threats' + Arr1);
      if (Arr1.length > 0) {
        return false;
      }
      return takeOrBlockOrEnPassant();
      // return Arr1;
    };
    return validMoves();
  };
  return escapeMoves();
}

const pieces = [
  { piece: 'bishop', owner: 1, x: 1, y: 4 },
  { piece: 'king', owner: 1, x: 4, y: 0 },
  { piece: 'queen', owner: 1, x: 0, y: 7, prevX: 0, prevY: 6 },
  { piece: 'king', owner: 0, x: 4, y: 7 },
  { piece: 'pawn', owner: 0, x: 4, y: 6 },
  { piece: 'pawn', owner: 0, x: 5, y: 6 },
  { piece: 'knight', owner: 0, x: 1, y: 7 },
  { piece: 'bishop', owner: 0, x: 3, y: 7 },
  { piece: 'rook', owner: 0, x: 5, y: 7 },
  { piece: 'rook', owner: 0, x: 1, y: 7 },
];

// console.log(isCheck(pieces, 0));
console.log(isMate(pieces, 0));


/*
const pieces = [
  { piece: 'king', owner: 1, x: 4, y: 1 },
  { piece: 'bishop', owner: 1, x: 5, y: 0 },
  { piece: 'queen', owner: 1, x: 3, y: 0 },
  { piece: 'pawn', owner: 1, x: 3, y: 2 },
  { piece: 'king', owner: 0, x: 4, y: 7 },
  { piece: 'bishop', owner: 0, x: 5, y: 1 },
  { piece: 'knight', owner: 0, x: 3, y: 3 },
  { piece: 'knight', owner: 0, x: 4, y: 3 },
];
// [ { piece: 'knight', owner: 0, x: 3, y: 3 } ]
// true

const pieces = [
  { piece: 'king', owner: 1, x: 4, y: 0 },
  { piece: 'queen', owner: 1, x: 7, y: 4, prevX: 3, prevY: 0 },
  { piece: 'king', owner: 0, x: 4, y: 7 },
  { piece: 'pawn', owner: 0, x: 7, y: 4 },
  { piece: 'pawn', owner: 0, x: 6, y: 5 },
  { piece: 'pawn', owner: 0, x: 7, y: 6 },
  { piece: 'pawn', owner: 0, x: 4, y: 6 },
  { piece: 'queen', owner: 0, x: 3, y: 7 },
  { piece: 'pawn', owner: 0, x: 3, y: 6 },
  { piece: 'rook', owner: 0, x: 7, y: 7 },
  { piece: 'bishop', owner: 0, x: 5, y: 7 },
  { piece: 'knight', owner: 0, x: 6, y: 7 },
];

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
