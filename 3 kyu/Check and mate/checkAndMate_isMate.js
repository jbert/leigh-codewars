// instructions below
// some code is identical in isCheck & isMate, in practice to reduce the code base I would protect
// under a namespace or module and use Observer pattern or monitor a simple object eg: checkObj =
// {isMate: null} -> {isMate: true || false} for a change & once change registered updated return

function isMate(Pieces, Player) {
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
        fixedPiecesArr: [],
        isMate: null,
        attackVectors: [],
        allPieces: [],
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
          if (x === this.state.threatenedSquares[i][1][j][0] && y ===
            this.state.threatenedSquares[i][1][j][1]) {
            this.state.inCheckArr.push(this.state.threatenedSquares[i]);
          }
        }
      }
    }
    // check player is able to reply with piece, ie no own or opponents pieces blocking
    checkReplyVector(checkPieceX, checkPieceY, defendingPiece) {
      const { x, y } = defendingPiece;
      const replyVectors = [];
      let allPiecesArr = [];
      // build holding array, AllPiecesArr of all pieces in the format [[x, y], ..]
      const arr1 = (() => {
        const tmpArr = [];
        for (let i = 0; i < this.state.player0Pieces.length; i++) {
          tmpArr.push([this.state.player0Pieces[i].x, this.state.player0Pieces[i].y]);
        }
        return tmpArr;
      })();
      const arr2 = (() => {
        const tmpArr = [];
        for (let i = 0; i < this.state.player1Pieces.length; i++) {
          tmpArr.push([this.state.player1Pieces[i].x, this.state.player1Pieces[i].y]);
        }
        return tmpArr;
      })();

      allPiecesArr = [...arr1, ...arr2];
      this.state.allPieces.push(allPiecesArr);

      // build approach vector between defending piece and checking attacker
      if (defendingPiece.piece === 'rook') {
        if (checkPieceX === x) {
          if (checkPieceY > y) {
            for (let j = y + 1; j < checkPieceY; j++) {
              replyVectors.push([checkPieceX, j]);
            }
          }
          if (y > checkPieceY) {
            for (let j = checkPieceY + 1; j < y; j++) {
              replyVectors.push([checkPieceX, j]);
            }
          }
        }
        if (checkPieceY === y) {
          if (checkPieceX < x) {
            for (let j = checkPieceX + 1; j < x; j++) {
              replyVectors.push([j, checkPieceY]);
            }
          }
          if (x < checkPieceX) {
            for (let j = x + 1; j < checkPieceX; j++) {
              replyVectors.push([j, checkPieceY]);
            }
          }
        }
      }
      if (defendingPiece.piece === 'bishop') {
        if (checkPieceX > x && checkPieceY > y) {
          for (let j = x + 1, k = y + 1; j < checkPieceX; j++, k++) {
            replyVectors.push([j, k]);
          }
        }
        if (checkPieceX > x && checkPieceY < y) {
          for (let j = x + 1, k = y - 1; j < checkPieceX; j++, k--) {
            replyVectors.push([j, k]);
          }
        }
        if (checkPieceX < x && checkPieceY < y) {
          for (let j = x - 1, k = y - 1; j > checkPieceX; j--, k--) {
            replyVectors.push([j, k]);
          }
        }
        if (checkPieceX < x && checkPieceY > y) {
          for (let j = x - 1, k = y + 1; j > checkPieceX; j--, k++) {
            replyVectors.push([j, k]);
          }
        }
      }
      if (defendingPiece.piece === 'queen') {
        if (checkPieceX === x) {
          if (checkPieceY > y) {
            for (let j = y + 1; j < checkPieceY; j++) {
              replyVectors.push([checkPieceX, j]);
            }
          }
          if (y > checkPieceY) {
            for (let j = checkPieceY + 1; j < y; j++) {
              replyVectors.push([checkPieceX, j]);
            }
          }
        }
        if (checkPieceY === y) {
          if (checkPieceX < x) {
            for (let j = checkPieceX + 1; j < x; j++) {
              replyVectors.push([j, checkPieceY]);
            }
          }
          if (x < checkPieceX) {
            for (let j = x + 1; j < checkPieceX; j++) {
              replyVectors.push([j, checkPieceY]);
            }
          }
        }
        if (checkPieceX > x && checkPieceY > y) {
          for (let j = x + 1, k = y + 1; j < checkPieceX; j++, k++) {
            replyVectors.push([j, k]);
          }
        }
        if (checkPieceX > x && checkPieceY < y) {
          for (let j = x + 1, k = y - 1; j < checkPieceX; j++, k--) {
            replyVectors.push([j, k]);
          }
        }
        if (checkPieceX < x && checkPieceY < y) {
          for (let j = x - 1, k = y - 1; j > checkPieceX; j--, k--) {
            replyVectors.push([j, k]);
          }
        }
        if (checkPieceX < x && checkPieceY > y) {
          for (let j = x - 1, k = y + 1; j > checkPieceX; j--, k++) {
            replyVectors.push([j, k]);
          }
        }
      }

      // check if any pieces in way of defender taking checking attacking
      for (let i = 0; i < replyVectors.length; i++) {
        for (let j = 0; j < allPiecesArr.length; j++) {
          if (replyVectors[i].toString() === allPiecesArr[j].toString()) {
            return false;
          }
        }
      }
      return true;
    }

    // examine opponents first then own pieces to see if a checking rook, queen or bishop
    // approach vector is already blocked
    removeAlreadyBlockedPiecesFromCheckArr(board) {
      const [kingX, kingY] = this.state.defendingKingSquare;
      const attackVectors = [];
      // the squares the attacking piece must cover between itself and the King
      (function buildAttackVectors() {
        for (let i = 0; i < board.state.inCheckArr.length; i++) {
          if (board.state.inCheckArr[i][0].piece === 'rook') {
            const tmpArr = [];
            const { x } = board.state.inCheckArr[i][0];
            const { y } = board.state.inCheckArr[i][0];
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
            attackVectors.push([board.state.inCheckArr[i][0], tmpArr]);
          }

          if (board.state.inCheckArr[i][0].piece === 'bishop') {
            const tmpArr = [];
            const { x } = board.state.inCheckArr[i][0];
            const { y } = board.state.inCheckArr[i][0];

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
            attackVectors.push([board.state.inCheckArr[i][0], tmpArr]);
          }

          if (board.state.inCheckArr[i][0].piece === 'queen') {
            const tmpArr = [];
            const { x } = board.state.inCheckArr[i][0];
            const { y } = board.state.inCheckArr[i][0];
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
            attackVectors.push([board.state.inCheckArr[i][0], tmpArr]);
          }
        }
      }());

      // could refactor the following 'check blocking' functions as similar although can
      // more easily see what the program is doing kept separate
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
              if (j === attackV[i][1].length - 1 && k === playerPieces.length - 1) {
                if (holdingArray.length === 1) {
                  board.state.fixedPiecesArr.push(holdingArray);
                }
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
          Array.from(board.state.player0Pieces) : Array.from(board.state.player1Pieces);
        // can't block with King remove from playerPieces array
        for (let q = 0; q < playerPieces.length; q++) {
          if (playerPieces[q].piece === 'king') {
            playerPieces.splice(q, 1);
            break;
          }
        }
        const attackV = Array.from(attackVectors);
        let blockingPiecesHoldingArr = [];

        // check attackV to see if threat already blocked by own pieces
        let breakAllLoopsCheck = false;
        for (let i = 0; i < attackV.length; i++) {
          for (let j = 0; j < attackV[i][1].length; j++) {
            for (let k = 0; k < playerPieces.length; k++) {
              const { x: blockingPieceX, y: blockingPieceY } = playerPieces[k];
              if (blockingPieceX === attackV[i][1][j][0] && blockingPieceY ===
              attackV[i][1][j][1]) {
                blockingPiecesHoldingArr.push(playerPieces[k]);
                // remove threat from inCheck array as currently blocked by player
                for (let z = 0; z < board.state.inCheckArr.length; z++) {
                  if (attackV[i][0].x === board.state.inCheckArr[z][0].x && attackV[i][0].y ===
                  board.state.inCheckArr[z][0].y) {
                    board.state.inCheckArr.splice(z, 1);
                  }
                }
              }
              // if only piece blocking the approach vector, piece is fixed in place
              if (j === attackV[i][1].length - 1 && k === playerPieces.length - 1) {
                if (blockingPiecesHoldingArr.length === 1) {
                  board.state.fixedPiecesArr.push(blockingPiecesHoldingArr);
                }
                // remove from attackV, no further threat posed
                if (blockingPiecesHoldingArr.length > 0) {
                  attackV.splice(i, 1);
                  if (i > 0) {
                    i--;
                  }
                  j = -1;
                }
                blockingPiecesHoldingArr = [];
              }
              if (attackV.length === 0) {
                breakAllLoopsCheck = true;
                break;
              }
            }
            if (breakAllLoopsCheck) {
              break;
            }
          }
          if (breakAllLoopsCheck) {
            break;
          }
        }
        if (board.state.inCheckArr.length === 0) {
          this.state.isMate = false;
        }
        // for use later when attempting to block rook, queen or bishop attackVectors
        board.state.attackVectors.push(attackV);
      }());
    }

    ableToTakeorBlockOpponentsCheckingPiece() {
      const { x: checkingPieceX, y: checkingPieceY } = this.state.inCheckArr[0][0];
      const defendingPiecesArr = this.state.defendableSquares;

      // remove fixed pieces blocking an opponents otherwise checking piece
      if (this.state.fixedPiecesArr.length > 0) {
        for (let i = 0; i < this.state.fixedPiecesArr.length; i++) {
          for (let j = 0; j < defendingPiecesArr.length; j++) {
            if (this.state.fixedPiecesArr[i][0].x === defendingPiecesArr[j][0].x &&
                this.state.fixedPiecesArr[i][0].y === defendingPiecesArr[j][0].y) {
              defendingPiecesArr.splice(j, 1);
            }
          }
        }
      }
      // is player able to take checking piece
      for (let i = 0; i < defendingPiecesArr.length; i++) {
        for (let j = 0; j < defendingPiecesArr[i][1].length; j++) {
          if (JSON.stringify(defendingPiecesArr[i][1][j]) === JSON.stringify([checkingPieceX,
            checkingPieceY])) {
            const thePce = defendingPiecesArr[i][0].piece;
            // check potential replyVector not blocked
            if (thePce === 'rook' || thePce === 'bishop' || thePce === 'queen') {
              if (this.checkReplyVector(checkingPieceX, checkingPieceY, defendingPiecesArr[i][0])
                === true) {
                this.state.isMate = false;
                return false;
              }
              if (this.checkReplyVector(checkingPieceX, checkingPieceY, defendingPiecesArr[i][0])
                === false) {
                this.state.isMate = true;
                return true;
              }
            }
            // if attampting to take with King, ensure the attacking piece is not in
            // a square 'checked' by another piece
            if (thePce === 'king') {
              for (let k = 0; k < this.state.threatenedSquares.length; k++) {
                for (let l = 0; l < this.state.threatenedSquares[k][1].length; l++) {
                  if (JSON.stringify([checkingPieceX, checkingPieceY]) ===
                  JSON.stringify(this.state.threatenedSquares[k][1][l])) {
                    this.state.isMate = true;
                    return true;
                  }
                }
              }
            }
            // otherwise OK to take checking piece
            this.state.isMate = false;
            return false;
          }
        }
      }
      // can checking piece be blocked
      const thePce = this.state.inCheckArr[0][0].piece;
      if (thePce === 'rook' || thePce === 'bishop' || thePce === 'queen') {
        // remove king from defendingPiecesArr to check the array for 'check blocking' moves
        for (let i = 0; i < defendingPiecesArr.length; i++) {
          if (defendingPiecesArr[i][0].piece === 'king') {
            defendingPiecesArr.splice(i, 1);
            break;
          }
        }
        // can player block with remaining pieces
        // remove pawns diagonal 'take' vectors, will handle special pawn moves later
        const defPiecesMinusPawns = Array.from(defendingPiecesArr);
        for (let i = defPiecesMinusPawns.length - 1; i >= 0; i--) {
          if (defPiecesMinusPawns[i][0].piece === 'pawn') {
            defPiecesMinusPawns.splice(i, 1);
          }
        }

        const remainingPieces = Array.from(defPiecesMinusPawns);

        for (let i = 0; i < remainingPieces.length; i++) {
          for (let j = 0; j < remainingPieces[i][1].length; j++) {
            for (let k = 0; k < this.state.attackVectors[0].length; k++) {
              for (let l = 0; l < this.state.attackVectors[0][k][1].length; l++) {
                if (JSON.stringify(remainingPieces[i][1][j]) ===
                JSON.stringify(this.state.attackVectors[0][k][1][l])) {
                  // check if reply vector obstructed by any pieces (for rook/ bishop/ queen)
                  // if not player is able to take attacking piece
                  const { 0: atVX, 1: atVY } = this.state.attackVectors[0][k][1][l];
                  if (this.checkReplyVector(atVX, atVY, remainingPieces[i][0]) === true) {
                    this.state.isMate = false;
                    break;
                  }
                }
              }
            }
          }
        }
      }
      return false;
    }

    minusThreatenedSquares(availMoves) {
      const movesAvail = availMoves;
      // splicing array with nested for loop => count backwards on first loop
      for (let i = movesAvail.length - 1; i >= 0; i--) {
        for (let j = 0; j < this.state.threatenedSquares.length; j++) {
          if (movesAvail.length === 0) { break; }
          for (let k = 0; k < this.state.threatenedSquares[j][1].length; k++) {
            if (movesAvail[i][0] === this.state.threatenedSquares[j][1][k][0] &&
            movesAvail[i][1] === this.state.threatenedSquares[j][1][k][1]) {
              movesAvail.splice(i, 1);
              if (i > 0) { i = movesAvail.length - 1; }
              k = 0;
              j = 0;
              if (movesAvail.length === 0) {
                break;
              }
            }
          }
        }
      }

      return (() => {
        if (movesAvail.length > 0) {
          this.state.isMate = false;
        }
      })();
    }

    // King's moves minus own pieces currently blocking escape
    kingAbletoMovetoFreeSquare(arr) {
      const availMoves = arr;
      const ownPiecesArr = Array.from((this.player === 0) ?
        this.state.player0Pieces : this.state.player1Pieces);
      for (let i = availMoves.length - 1; i >= 0; --i) {
        if (availMoves.length === 0) { break; }
        for (let j = 0; j < ownPiecesArr.length; j++) {
          if (availMoves[i][0] === ownPiecesArr[j].x && availMoves[i][1] === ownPiecesArr[j].y) {
            availMoves.splice(i, 1);
            i = availMoves.length - 1;
            if (availMoves.length === 0) {
              break;
            }
            // if set to 0 immediately increments++
            j = -1;
          }
        }
      }
      if (availMoves.length === 0) {
        this.ableToTakeorBlockOpponentsCheckingPiece();
      } // minus from availMove squares already under threat by opponent's pieces
      if (availMoves.length > 0) {
        this.minusThreatenedSquares(availMoves);
      }
    }
    // special funcitonality for pawns' initialMove and enPassant
    pawnSpecialMoveCheck(boardThreatenedDefendedSquares, board) {
      for (let i = 0; i < this.pieces.length; i++) {
        if (this.pieces[i].piece === 'pawn') {
          if (this.player === 0) {
            if (this.pieces[i].y === 6) {
              boardThreatenedDefendedSquares.buildInRangeOfPawn(null, this.player, [], 'initialMove', board);
            }
            if (this.pieces[i].y === 3 && this.pieces[i].prevY === 1) {
              boardThreatenedDefendedSquares.buildInRangeOfPawn(null, this.player, [], 'enPassant', board);
            }
          }

          if (this.state.isMate === false) {
            return false;
          }

          if (this.player === 1) {
            if (board.pieces[i].y === 1) {
              boardThreatenedDefendedSquares.buildInRangeOfPawn(null, this.player, [], 'initialMove', board);
            }
            if (this.pieces[i].y === 4 && this.pieces[i].prevY === 6) {
              boardThreatenedDefendedSquares.buildInRangeOfPawn(null, board.player, [], 'enPassant', board);
            }
          }
        }
      }
      return true;
    }
  }

  // object composition factory returns object exposing methods to create inRange squares
  function threatsOrDefendableSquaresFactory() {
    const protoSquaresInRangeFactory = {
      // buildAll func to build all, although can use components separately
      // injected playr as potentially useful to mock in unit testing (dependency injection)
      buildAll(piecesArray, playr, specialMovePseudoOverloading) {
        const pieceThreatsorDefendableSquaresArray = [];
        for (let i = 0; i < piecesArray.length; i++) {
          if (piecesArray[i].piece === 'king') {
            this.buildInRangeOfKing(piecesArray[i], pieceThreatsorDefendableSquaresArray);
          }
          if (piecesArray[i].piece === 'pawn') {
            this.buildInRangeOfPawn(
              piecesArray[i], playr, pieceThreatsorDefendableSquaresArray,
              specialMovePseudoOverloading,
            );
          }
          if (piecesArray[i].piece === 'knight') {
            this.buildInRangeOfKnight(piecesArray[i], pieceThreatsorDefendableSquaresArray);
          }
          if (piecesArray[i].piece === 'rook') {
            this.buildInRangeOfRook(piecesArray[i], pieceThreatsorDefendableSquaresArray);
          }
          if (piecesArray[i].piece === 'bishop') {
            this.buildInRangeOfBishop(piecesArray[i], pieceThreatsorDefendableSquaresArray);
          }
          if (piecesArray[i].piece === 'queen') {
            this.buildInRangeOfQueen(piecesArray[i], pieceThreatsorDefendableSquaresArray);
          }
        }
        return pieceThreatsorDefendableSquaresArray;
      },

      // in case we decide to add an entirely new piece to extend our usual game of chess!
      openClosedPrincipleAddNewPieceFunctionality(playr, board, newPieceName, newPieceRules) {
        return newPieceName(newPieceRules(playr, board));
      },

      // abbrev: pieceThreatsorDefendableSquaresArray to pToDSA when used as params
      buildInRangeOfKing(kingObj, pToDSA) {
        // squares in range of king
        const inRange = [];
        const { x } = kingObj;
        const { y } = kingObj;
        if (x - 1 >= 0) {
          inRange.push([x - 1, y]);
          if (y - 1 >= 0) {
            inRange.push([x - 1, y - 1]);
          }
          if (y + 1 < 8) {
            inRange.push([x - 1, y + 1]);
          }
        }
        if (x + 1 < 8) {
          inRange.push([x + 1, y]);
          if (y - 1 >= 0) {
            inRange.push([x + 1, y - 1]);
          }
          if (y + 1 < 8) {
            inRange.push([x + 1, y + 1]);
          }
        }
        if (y - 1 >= 0) {
          inRange.push([x, y - 1]);
        }
        if (y + 1 < 8) {
          inRange.push([x, y + 1]);
        }
        pToDSA.push([kingObj, inRange]);
        return inRange;
      },
      buildInRangeOfPawn(pawnObj, playr, pToDSA, specialMovePseudoOverloading, board) {
        // if pawns are fixed in place as currently blocking checking piece
        function removeFixedPawns() {
          const defendingPawns = [];
          const playerPieces = (playr === 0) ?
            board.state.player0Pieces : board.state.player1Pieces;

          for (let i = 0; i < playerPieces.length; i++) {
            if (playerPieces[i].piece === 'pawn') {
              defendingPawns.push(playerPieces[i]);
            }
          }

          if (board.state.fixedPiecesArr.length > 0) {
            for (let i = 0; i < board.state.fixedPiecesArr.length; i++) {
              for (let j = 0; j < defendingPawns.length; j++) {
                if (board.state.fixedPiecesArr[i][0].x === defendingPawns[j].x
                  && board.state.fixedPiecesArr[i][0].y === defendingPawns[j].y) {
                  defendingPawns.splice(j, 1);
                  if (j > 0) {
                    j--;
                  }
                  if (defendingPawns.length === 0) {
                    break;
                  }
                  if (i > 0) {
                    i--;
                  }
                }
              }
              if (defendingPawns.length === 0) {
                break;
              }
            }
          }
          return defendingPawns;
        }

        // could separate pawns differing functionaility eg enPassant to another function
        if (specialMovePseudoOverloading === 'initialMove') {
          const pawnsAvailtoMove = removeFixedPawns();
          const squaresBlockableByPawnInitialMove = [];
          const Board = board;
          for (let i = 0; i < pawnsAvailtoMove.length; i++) {
            if (pawnsAvailtoMove[i].y === 6) {
              squaresBlockableByPawnInitialMove.push([pawnsAvailtoMove[i].x,
                pawnsAvailtoMove[i].y - 1]);
              squaresBlockableByPawnInitialMove.push([pawnsAvailtoMove[i].x,
                pawnsAvailtoMove[i].y - 2]);
            }
            if (pawnsAvailtoMove[i].y === 1) {
              squaresBlockableByPawnInitialMove.push([pawnsAvailtoMove[i].x,
                pawnsAvailtoMove[i].y + 1]);
              squaresBlockableByPawnInitialMove.push([pawnsAvailtoMove[i].x,
                pawnsAvailtoMove[i].y + 2]);
            }
          }
          // if piece has approach vector, can it be blocked by pawn initial move
          const thePce = board.state.inCheckArr[0][0].piece;
          if (thePce === 'rook' || thePce === 'bishop' || thePce === 'queen') {
            for (let c = 0; c < board.state.attackVectors.length; c++) {
              for (let d = 0; d < board.state.attackVectors[c][0][1].length; d++) {
                for (let e = 0; e < squaresBlockableByPawnInitialMove.length; e++) {
                  if (JSON.stringify(board.state.attackVectors[c][0][1][d]) ===
                  JSON.stringify(squaresBlockableByPawnInitialMove[e])) {
                    Board.state.isMate = false;
                    return false;
                  }
                }
              }
            }
          }
          Board.state.isMate = true;
          return true;
        }

        if (specialMovePseudoOverloading === 'enPassant') {
          const pawnsAvailtoMove = removeFixedPawns();
          const Board = board;
          const { x: checkingPieceX, y: checkingPieceY } = Board.state.inCheckArr[0][0];
          // if can take via en-passant
          for (let i = 0; i < pawnsAvailtoMove.length; i++) {
            if ((pawnsAvailtoMove[i].y === checkingPieceY) && ((pawnsAvailtoMove[i].x ===
              checkingPieceX - 1) || (pawnsAvailtoMove[i].x === checkingPieceX + 1))) {
              Board.state.isMate = false;
              return false;
            }
          }
          // otherwise, out of options to avoid a mate
          Board.state.isMate = true;
          return true;
        }

        // regular inRange of pawns, diagonal attack vector
        const inRange = [];
        const { x } = pawnObj;
        const { y } = pawnObj;
        if (pawnObj.owner === 0) {
          if (x - 1 >= 0) {
            inRange.push([x - 1, y - 1]);
          }
          if (x + 1 <= 7) {
            inRange.push([x + 1, y - 1]);
          }
        }
        if (pawnObj.owner === 1) {
          if (x - 1 >= 0) {
            inRange.push([x - 1, y + 1]);
          }
          if (x + 1 <= 7) {
            inRange.push([x + 1, y + 1]);
          }
        }
        pToDSA.push([pawnObj, inRange]);
        return pToDSA;
      },
      buildInRangeOfKnight(knightObj, pToDSA) {
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
        pToDSA.push([knightObj, inRange]);
      },
      buildInRangeOfRook(rookObj, pToDSA) {
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
        pToDSA.push([rookObj, inRange]);
      },
      buildInRangeOfBishop(bishopObj, pToDSA) {
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
        pToDSA.push([bishopObj, inRange]);
      },
      buildInRangeOfQueen(queenObj, pToDSA) {
        // squares in range of queen => inRangeOfRook + inRangeOfBishop combined
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
        pToDSA.push([queenObj, inRange]);
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
    board.state.threatenedSquares =
      boardThreatenedDefendedSquares.buildAll(board.state.player1Pieces, 0);
    board.state.defendableSquares =
      boardThreatenedDefendedSquares.buildAll(board.state.player0Pieces, 0);
  }
  if (board.player === 1) {
    board.state.threatenedSquares =
      boardThreatenedDefendedSquares.buildAll(board.state.player0Pieces, 1);
    board.state.defendableSquares =
      boardThreatenedDefendedSquares.buildAll(board.state.player1Pieces, 1);
  }
  board.determineIfKingIsIncheck();
  if (board.state.inCheckArr.length === 0) {
    return false;
  }

  board.removeAlreadyBlockedPiecesFromCheckArr(board);

  // buildinRangeofKing component reusable from anywhere, resulting array passed in as argument
  board.kingAbletoMovetoFreeSquare(boardThreatenedDefendedSquares.buildInRangeOfKing({ piece: 'king', x: board.state.defendingKingSquare[0], y: board.state.defendingKingSquare[1] }, []));

  if (board.state.isMate === false) {
    return false;
  }
  // can player take or block the checking piece
  board.ableToTakeorBlockOpponentsCheckingPiece();

  if (board.state.isMate === false) {
    return false;
  }

  // are there any special pawn moves available
  board.pawnSpecialMoveCheck(boardThreatenedDefendedSquares, board);

  return board.state.isMate;
}

module.exports = isMate;


/* if exporting isCheck() and isMate as one module
const checkModule = {};
Object.assign(checkModule, { isCheck, isMate });
module.exports = checkModule;

// usage:
const pieces =
[{ piece: 'king', owner: 1, x: 4, y: 0, },
 { piece: 'bishop', owner: 1, x: 1, y: 4, prevX: 3, prevY: 2, },
 { piece: 'queen', owner: 1, x: 0, y: 7, },
 { piece: 'pawn', owner: 0, x: 4, y: 6, },
 { piece: 'pawn', owner: 0, x: 5, y: 6, },
 { piece: 'rook', owner: 0, x: 1, y: 7, },
 { piece: 'king', owner: 0, x: 4, y: 7, },
 { piece: 'rook', owner: 0, x: 5, y: 7, },
 { piece: 'rook', owner: 1, x: 3, y: 4, }
];

console.log(isMate(pieces, 0));


Instructions:
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
(0) 8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
(1) 7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
(2) 6
(3) 5
(4) 4
(5) 3
(6) 2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
(7) 1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖

Note: if you do not see correctly the pieces on the board, please install the "Deja Vu Sans" font.

You can assume that the input is a valid chess position. The pieces are not in any particular order.

isCheck should return an array of the objects that threaten the king or false if not threatened
(Java: return a Set<Piece> object of the threatening pieces, or an empty set if none are found).
(PHP: return an array of associative arrays, false if none are found.)

isMate should return true if the player can't make a move that takes his king out of check, and
false if he can make such a move, or if the position is not a check.

To help with debugging, a function outputBoard(pieces) (Java: static method OutputBoard.print
(pieces), PHP: outputBoard($pieces), C#: static method void Figures.OutputBoard(IList<Figure>
figures)) is provided and will log to console the whole board with all pieces on it. The piece
with prevX and prevY properties will appear light gray on the board in the coordinates it used to
occupy (Python currently does not support unicode chess symbols, so the standard piece
abbreviations KPNBRQ are used. Same representation is used in Java and PHP).

A comprehensive list of how each piece moves can be found at http://en.wikipedia.org/wiki/Chess#Movement.

Note 1: these functions should work in a noninvasive fashion - don't change the contents of the
array or values of the pieces contained within it.

Note 2: the tests might not imply explicitly why a certain position is or isn't a check or mate.
If your code fails a test, you have to be able to analyze the situation and see which pieces are
to blame. If all else fails, try asking for help at the discussion board
*/
