/* Instructions:
If we were to set up a Tic-Tac-Toe game, we would want to know whether the board's current state is
solved, wouldn't we? Our goal is to create a function that will check that for us!

Assume that the board comes in the form of a 3x3 array, where the value is 0 if a spot is empty,
1 if it is an "X", or 2 if it is an "O", like so:

[[0, 0, 1],
 [0, 1, 2],
 [2, 1, 0]]

 We want our function to return:

-1 if the board is not yet finished (there are empty spots),
1 if "X" won,
2 if "O" won,
0 if it's a cat's game (i.e. a draw).
You may assume that the board passed in is valid in the context of a game of Tic-Tac-Toe.
*/

function isSolved(board) {
  // first row all 0
  if ((board[0][0] === 1) && (board[1][0] === 1) && (board[2][0] === 1)) {
    return 1;
  } // 2nd row all 0
  if ((board[0][1] === 1) && (board[1][1] === 1) && (board[2][1] === 1)) {
    return 1;
  } // 3rd row all 0
  if ((board[0][2] === 1) && (board[1][2] === 1) && (board[2][2] === 1)) {
    return 1;
  }

  // first row all X
  if ((board[0][0] === 2) && (board[1][0] === 2) && (board[2][0] === 2)) {
    return 2;
  }
  if ((board[0][1] === 2) && (board[1][1] === 2) && (board[2][1] === 2)) {
    return 2;
  }
  if ((board[0][2] === 2) && (board[1][2] === 2) && (board[2][2] === 2)) {
    return 2;
  }

  // first column all 0
  if ((board[0][0] === 1) && (board[0][1] === 1) && (board[0][2] === 1)) {
    return 1;
  }
  if ((board[0][1] === 1) && (board[1][1] === 1) && (board[2][1] === 1)) {
    return 1;
  }
  if ((board[0][2] === 1) && (board[1][2] === 1) && (board[2][2] === 1)) {
    return 1;
  }

  // first column all X
  if ((board[0][0] === 2) && (board[0][1] === 2) && (board[0][2] === 2)) {
    return 2;
  }
  if ((board[0][1] === 2) && (board[1][1] === 2) && (board[2][1] === 2)) {
    return 2;
  }
  if ((board[0][2] === 2) && (board[1][2] === 2) && (board[2][2] === 2)) {
    return 2;
  }

  // Diagonal top left to bottom right 0
  if ((board[0][0] === 1) && (board[1][1] === 1) && (board[2][2] === 1)) {
    return 1;
  }

  // diagonal top left to bottom right X
  if ((board[0][0] === 2) && (board[1][1] === 2) && (board[2][2] === 2)) {
    return 2;
  }

  // diagonal top right to bottom left 0
  if ((board[2][0] === 1) && (board[1][1] === 1) && (board[0][2] === 1)) {
    return 1;
  }

  // diagonal top right to bottom left X

  if ((board[2][0] === 2) && (board[1][1] === 2) && (board[0][2] === 2)) {
    return 2;
  }

  for (let i = 0; i < 3; i++) {
    if (board[i].includes(0)) {
      return -1;
    }
  }

  return 0;
}

// for testing
module.exports = isSolved;

// console.log(isSolved([[2, 1, 1], [0, 1, 1], [2, 2, 2]]));
