/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const { expect } = require('chai');
const reverse = require('../The soul of wit reverse an array');

describe('reverse() should reverse input array', function () {
  const tests = [
    { args: [2, 1, 4, 7], expected: [7, 4, 1, 2] },
    {
      args: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0, 1, 5],
      expected: [5, 1, 0, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    },
  ];
  tests.forEach(function (test) {
    it(`Checks reverses ${test.args} as ${test.expected}`, function () {
      const res = reverse(test.args);
      expect(res).to.eql(test.expected);
    });
  });
});


/*
Pawn threatens king - Expected: '[{ piece: \'pawn\', owner: 1, x: 5, y: 6 }]', instead got: 'undefined'
Rook threatens king - Expected: '[{ piece: \'rook\', owner: 1, x: 4, y: 1 }]', instead got: 'undefined'
Knight threatens king - Expected: '[{ piece: \'knight\', owner: 1, x: 2, y: 6 }]', instead got: 'undefined'
Bishop threatens king - Expected: '[{ piece: \'bishop\', owner: 1, x: 0, y: 3 }]', instead got: 'undefined'
Queen threatens king - Expected: '[{ piece: \'queen\', owner: 1, x: 4, y: 1 }]', instead got: 'undefined'
Queen threatens king - Expected: '[{ piece: \'queen\', owner: 1, x: 7, y: 4 }]', instead got: 'undefined'

var pieces = [
  {piece: "king", owner: 1, x: 4, y: 0},
  {piece: "king", owner: 0, x: 4, y: 7},
  {piece: "pawn", owner: 1, x: 5, y: 6}
];
Test.assertSimilar(isCheck(pieces, 0), [pieces[2]], "Pawn threatens king");

pieces = [
  {piece: "king", owner: 1, x: 4, y: 0},
  {piece: "king", owner: 0, x: 4, y: 7},
  {piece: "rook", owner: 1, x: 4, y: 1}
];
Test.assertSimilar(isCheck(pieces, 0), [pieces[2]], "Rook threatens king");

pieces = [
  {piece: "king", owner: 1, x: 4, y: 0},
  {piece: "king", owner: 0, x: 4, y: 7},
  {piece: "knight", owner: 1, x: 2, y: 6}
];
Test.assertSimilar(isCheck(pieces, 0), [pieces[2]], "Knight threatens king");

pieces = [
  {piece: "king", owner: 1, x: 4, y: 0},
  {piece: "king", owner: 0, x: 4, y: 7},
  {piece: "bishop", owner: 1, x: 0, y: 3}
];
Test.assertSimilar(isCheck(pieces, 0), [pieces[2]], "Bishop threatens king");

pieces = [
  {piece: "king", owner: 1, x: 4, y: 0},
  {piece: "king", owner: 0, x: 4, y: 7},
  {piece: "queen", owner: 1, x: 4, y: 1}
];
Test.assertSimilar(isCheck(pieces, 0), [pieces[2]], "Queen threatens king");

pieces = [
  {piece: "king", owner: 1, x: 4, y: 0},
  {piece: "king", owner: 0, x: 4, y: 7},
  {piece: "queen", owner: 1, x: 7, y: 4}
];
Test.assertSimilar(isCheck(pieces, 0), [pieces[2]], "Queen threatens king");

pieces = [
  {piece: "king", owner: 1, x: 4, y: 0},
  {piece: "pawn", owner: 0, x: 4, y: 6},
  {piece: "pawn", owner: 0, x: 5, y: 6},
  {piece: "king", owner: 0, x: 4, y: 7},
  {piece: "bishop", owner: 0, x: 5, y: 7},
  {piece: "bishop", owner: 1, x: 1, y: 4},
  {piece: "rook", owner: 1, x: 2, y: 7, prevX: 2, prevY: 5}
]
sortFunc = function(a, b)
{
  if(a.y == b.y) return a.x - b.x;
  return a.y - b.y;
}

Test.assertSimilar(isCheck(pieces, 0).sort(sortFunc), [pieces[5], pieces[6]], "Double threat");
*/
