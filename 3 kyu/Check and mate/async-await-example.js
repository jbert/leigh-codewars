// own pieces piecesXYay
const piecesXY = [[4, 7], [7, 4], [6, 5], [7, 6], [4, 6], [3, 6], [7, 7], [6, 7], [3, 7]];
const kingsMoves = [[3, 7], [3, 6], [4, 6], [5, 6], [5, 7]];
const possMoves = kingsMoves.slice();

const possMovesAvail = function pMA() {
  // await TO('Boom');
  for (let i = 0; i < possMoves.length; i++) {
    const kingMove = possMoves[i].toString();
    for (let j = 0; j < piecesXY.length; j++) {
      const pice = piecesXY[j].toString();
      if (kingMove === pice) {
        // console.log(kingMove);
        // console.log(pice);
        possMoves.splice(i, 1);
        --i;
        break;
      }
    }
  }
  return possMoves;
};

// possMovesAvail().then(a => console.log(a));

const Chessapp = {};
Chessapp.threats = [
  [ [ 'queen', 1, 7, 4, 3, 0 ], 0, 4 ],
  [ [ 'queen', 1, 7, 4, 3, 0 ], 1, 4 ],
  [ [ 'queen', 1, 7, 4, 3, 0 ], 5, 6 ],
  [ [ 'queen', 1, 7, 4, 3, 0 ], 1, 10 ] ];

function buildThreats() {
  const threts = [];
  for (let j = 0; j < Chessapp.threats.length; j++) {
    threts.push([Chessapp.threats[j][1], Chessapp.threats[j][2]]);
  }
  return threts;
}

async function validEscapeMoves() {
  const possMves = await possMovesAvail();
  const threats = await buildThreats();

  const validMoves = function vMvs() {
    for (let i = 0; i < possMves.length; i++) {
      const kingMove = possMves[i].toString();
      for (let j = 0; j < threats.length; j++) {
        const thret = threats[j].toString();
        if (kingMove === thret) {
          // console.log(kingMove);
          // console.log(pice);
          possMves.splice(i, 1);
          --i;
          break;
        }
      }
    }
    console.log(possMves);
    return possMves;
  };
  return validMoves();
}

validEscapeMoves();



/*
const possMovesAvail = (kingMoves.filter((elem) => {
  const possMove = JSON.stringify(elem);
  for (let i = 0; i < piecesXY.length; i++) {
    const pieceAtSquare = JSON.stringify(piecesXY[i]);
    if (possMove === pieceAtSquare) {
      return false;
    }
  }
  return true;
}));
*/
