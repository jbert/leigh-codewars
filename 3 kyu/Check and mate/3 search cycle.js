// was going to copy this into the main app and get ensure working!

const board = {};
board.checkPieces = [['bishop', 6, 1]]; //['rook', 3, 6], ['queen', 5, 5, 0, 6]];
board.kingX = 2;
board.kingY = 5;

const threatVectors = [];
// the squares the attacking piece must cover between itself and the King
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
        }
        if (board.kingX < x) {
          for (let j = board.kingX + 1; j < x; j++) {
            tmpArr.push([j, y]);
          }
        }
      }
      if (x === board.kingX) {
        if (y > board.kingY) {
          for (let j = board.kingY + 1; j < y; j++) {
            tmpArr.push([x, j]);
          }
        }
        if (board.kingY > y) {
          for (let j = y + 1; j < board.kingY; j++) {
            tmpArr.push([x, j]);
          }
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
      }
      if (board.kingX > x && board.kingY < y) {
        let Y = y;
        for (let j = x + 1; j < board.kingX; j++) {
          tmpArr.push([j, Y -= 1]);
        }
      }

      if (board.kingX < x && board.kingY > y) {
        let kingX = board.kingX;
        let kingY = board.kingY;
        for (let j = kingX + 1; j < x; j++) {
          tmpArr.push([j, kingY -= 1]);
        }
      }
      if (board.kingX < x && board.kingY < y) {
        let kingY = board.kingY;
        for (let j = board.kingX + 1; j < x; j++) {
          tmpArr.push([j, kingY += 1]);
        }
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
        }
        if (board.kingX < x) {
          for (let j = board.kingX + 1; j < x; j++) {
            tmpArr.push([j, y]);
          }
        }
      }
      if (x === board.kingX) {
        if (y > board.kingY) {
          for (let j = board.kingY + 1; j < y; j++) {
            tmpArr.push([x, j]);
          }
        }
        if (board.kingY > y) {
          for (let j = y + 1; j < board.kingY; j++) {
            tmpArr.push([x, j]);
          }
        }
      }
      // diagonal attack threat vectors
      if (board.kingX > x && board.kingY > y) {
        for (let j = x + 1; j < board.kingX; j++) {
          tmpArr.push([j, j]);
        }
      }
      if (board.kingX > x && board.kingY < y) {
        let Y = y;
        for (let j = x + 1; j < board.kingX; j++) {
          tmpArr.push([j, Y -= 1]);
        }
      }
      if (board.kingX < x && board.kingY > y) {
        let kingX = board.kingX;
        let kingY = board.kingY;
        for (let j = kingX + 1; j < x; j++) {
          tmpArr.push([j, kingY -= 1]);
        }
      }
      if (board.kingX < x && board.kingY < y) {
        let kingY = board.kingY;
        for (let j = board.kingX + 1; j < x; j++) {
          tmpArr.push([j, kingY += 1]);
        }
      }
      threatVectors.push(tmpArr);
    }
  }
}());

console.log(threatVectors);
