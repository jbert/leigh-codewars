// array of pieces, and owner, used by test runners

const tests = [
  {
    args: [[{
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'queen', owner: 1, x: 0, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    }], 0],
    isCheckExpected: [{
      piece: 'queen', owner: 1, x: 0, y: 7,
    }],
    isMateExpected: false,
    testCase: 1,
  },

  {
    args: [[{
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'bishop', owner: 1, x: 1, y: 4, prevX: 3, prevY: 2,
    },
    {
      piece: 'queen', owner: 1, x: 0, y: 7,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'bishop', owner: 0, x: 3, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'queen', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'pawn', owner: 0, x: 2, y: 6,
    }], 0],
    isCheckExpected: [{
      piece: 'bishop', owner: 1, x: 1, y: 4, prevX: 3, prevY: 2,
    }],
    isMateExpected: false,
    // explanation: 'pawn 2,6 can intercept bishop by moving 1 forwards',
    testCase: 2,
  },

  {
    args: [[{
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'bishop', owner: 1, x: 1, y: 4, prevX: 3, prevY: 2,
    },
    {
      piece: 'queen', owner: 1, x: 0, y: 7,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'queen', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'pawn', owner: 0, x: 1, y: 6,
    }], 0],
    isCheckExpected: [{
      piece: 'bishop', owner: 1, x: 1, y: 4, prevX: 3, prevY: 2,
    },
    {
      piece: 'queen', owner: 1, x: 0, y: 7,
    }],
    isMateExpected: true,
    // explanation: 'pawn 1,6 can intercept bishop by moving 2 forwards',
    testCase: 3,
  },

  {
    args: [[{
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'rook', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'rook', owner: 1, x: 3, y: 7, prevX: 3, prevY: 0,
    }], 0],
    isCheckExpected: [{
      piece: 'rook', owner: 1, x: 3, y: 7, prevX: 3, prevY: 0,
    }],
    isMateExpected: false,
    testCase: 4,
  },

  {
    args: [[{
      piece: 'knight', owner: 0, x: 3, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'queen', owner: 0, x: 3, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'bishop', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'knight', owner: 1, x: 3, y: 5, prevX: 2, prevY: 3,
    }], 0],
    isCheckExpected: [{
      piece: 'knight', owner: 1, x: 3, y: 5, prevX: 2, prevY: 3,
    }],
    isMateExpected: false,
    testCase: 5,
  },

  {
    args: [[{
      piece: 'pawn', owner: 0, x: 6, y: 4,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 5,
    },
    {
      piece: 'pawn', owner: 0, x: 3, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 7, y: 6,
    },
    {
      piece: 'queen', owner: 0, x: 3, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'bishop', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'knight', owner: 0, x: 6, y: 7,
    },
    {
      piece: 'rook', owner: 0, x: 7, y: 7,
    },
    {
      piece: 'queen', owner: 1, x: 7, y: 4, prevX: 3, prevY: 0,
    },
    {
      piece: 'king', owner: 1, x: 4, y: 0,
    }], 0],
    isCheckExpected: [{
      piece: 'queen', owner: 1, x: 7, y: 4, prevX: 3, prevY: 0,
    }],
    isMateExpected: true,
    testCase: 6,
  },

  {
    args: [[{
      piece: 'pawn', owner: 0, x: 4, y: 4,
    },
    {
      piece: 'knight', owner: 0, x: 2, y: 5,
    },
    {
      piece: 'pawn', owner: 0, x: 6, y: 5,
    },
    {
      piece: 'knight', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'queen', owner: 0, x: 3, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'bishop', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'knight', owner: 1, x: 5, y: 5, prevX: 3, prevY: 4,
    },
    {
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'pawn', owner: 1, x: 4, y: 3,
    }], 0],
    isCheckExpected: [{
      piece: 'knight', owner: 1, x: 5, y: 5, prevX: 3, prevY: 4,
    }],
    isMateExpected: true,
    // explanation: should be a mate?
    testCase: 7,
  },

  {
    args: [[{
      piece: 'pawn', owner: 0, x: 6, y: 4,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 5,
    },
    {
      piece: 'pawn', owner: 0, x: 3, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 7, y: 6,
    },
    {
      piece: 'queen', owner: 0, x: 3, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'bishop', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'knight', owner: 0, x: 6, y: 7,
    },
    {
      piece: 'rook', owner: 0, x: 7, y: 7,
    },
    {
      piece: 'queen', owner: 1, x: 7, y: 4, prevX: 3, prevY: 0,
    },
    {
      piece: 'king', owner: 1, x: 4, y: 0,
    }], 0],
    isCheckExpected: [{
      piece: 'queen', owner: 1, x: 7, y: 4, prevX: 3, prevY: 0,
    }],
    isMateExpected: true,
    testCase: 8,
  },

  {
    args: [[{
      piece: 'pawn', owner: 0, x: 4, y: 4,
    },
    {
      piece: 'knight', owner: 0, x: 2, y: 5,
    },
    {
      piece: 'pawn', owner: 0, x: 6, y: 5,
    },
    {
      piece: 'knight', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'queen', owner: 0, x: 3, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'bishop', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'knight', owner: 1, x: 5, y: 5, prevX: 3, prevY: 4,
    },
    {
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'pawn', owner: 1, x: 4, y: 3,
    }], 0],
    isCheckExpected: [{
      piece: 'knight', owner: 1, x: 5, y: 5, prevX: 3, prevY: 4,
    }],
    isMateExpected: true,
    // explanation: should be a mate?
    testCase: 9,
  },


  {
    args: [[{
      piece: 'pawn', owner: 0, x: 6, y: 4,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 5,
    },
    {
      piece: 'pawn', owner: 0, x: 3, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 7, y: 6,
    },
    {
      piece: 'queen', owner: 0, x: 3, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'bishop', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'knight', owner: 0, x: 6, y: 7,
    },
    {
      piece: 'rook', owner: 0, x: 7, y: 7,
    },
    {
      piece: 'queen', owner: 1, x: 7, y: 4, prevX: 3, prevY: 0,
    },
    {
      piece: 'king', owner: 1, x: 4, y: 0,
    }], 0],
    isCheckExpected: [{
      piece: 'queen', owner: 1, x: 7, y: 4, prevX: 3, prevY: 0,
    }],
    isMateExpected: true,
    testCase: 10,
  },

  {
    args: [[{
      piece: 'knight', owner: 0, x: 3, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'queen', owner: 0, x: 3, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'bishop', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'queen', owner: 1, x: 4, y: 1,
    },
    {
      piece: 'knight', owner: 1, x: 3, y: 5, prevX: 2, prevY: 3,
    }], 0],
    isCheckExpected: [{
      piece: 'knight', owner: 1, x: 3, y: 5, prevX: 2, prevY: 3,
    }],
    isMateExpected: true,
    testCase: 11,
  },

  {
    args: [[{
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'bishop', owner: 1, x: 1, y: 4, prevX: 3, prevY: 2,
    },
    {
      piece: 'queen', owner: 1, x: 0, y: 7,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'rook', owner: 0, x: 1, y: 7,
    },
    {
      piece: 'bishop', owner: 0, x: 3, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'rook', owner: 0, x: 5, y: 7,
    }], 0],
    isCheckExpected: [{
      piece: 'bishop', owner: 1, x: 1, y: 4, prevX: 3, prevY: 2,
    }],
    isMateExpected: false,
    // explanation: should be a mate?
    testCase: 12,
  },

  {
    args: [[{
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'bishop', owner: 1, x: 1, y: 4, prevX: 3, prevY: 2,
    },
    {
      piece: 'queen', owner: 1, x: 0, y: 7,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'knight', owner: 0, x: 1, y: 7,
    },
    {
      piece: 'bishop', owner: 0, x: 3, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'rook', owner: 0, x: 5, y: 7,
    }], 0],
    isCheckExpected: [{
      piece: 'bishop', owner: 1, x: 1, y: 4, prevX: 3, prevY: 2,
    }],
    isMateExpected: false,
    testCase: 13,
  },

  {
    args: [[{
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'rook', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'queen', owner: 1, x: 3, y: 7, prevX: 2, prevY: 6,
    },
    {
      piece: 'rook', owner: 1, x: 3, y: 6,
    }], 0],
    isCheckExpected: [{
      piece: 'queen', owner: 1, x: 3, y: 7, prevX: 2, prevY: 6,
    }],
    isMateExpected: true,
    testCase: 14,
  },

  {
    args: [[{
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'bishop', owner: 1, x: 1, y: 4, prevX: 3, prevY: 2,
    },
    {
      piece: 'queen', owner: 1, x: 0, y: 7,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'rook', owner: 0, x: 1, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'rook', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'rook', owner: 1, x: 3, y: 4,
    }], 0],
    isCheckExpected: [{
      piece: 'bishop', owner: 1, x: 1, y: 4, prevX: 3, prevY: 2,
    }],
    isMateExpected: true,
    testCase: 15,
  },

  {
    args: [[{
      piece: 'king', owner: 1, x: 4, y: 0,
    },
    {
      piece: 'bishop', owner: 1, x: 0, y: 3, prevX: 3, prevY: 0,
    },
    {
      piece: 'queen', owner: 1, x: 0, y: 7,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'rook', owner: 0, x: 3, y: 7,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'bishop', owner: 0, x: 5, y: 7,
    },
    {
      piece: 'pawn', owner: 0, x: 1, y: 6,
    }], 0],
    isCheckExpected: [{
      piece: 'bishop', owner: 1, x: 0, y: 3, prevX: 3, prevY: 0,
    }],
    isMateExpected: false,
    testCase: 16,
  },

  {
    args: [[{
      piece: 'king', owner: 1, x: 5, y: 3,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 4, prevX: 4, prevY: 6,
    },
    {
      piece: 'pawn', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'knight', owner: 0, x: 2, y: 5,
    },
    {
      piece: 'pawn', owner: 1, x: 3, y: 4,
    },
    {
      piece: 'knight', owner: 1, x: 3, y: 3,
    },
    {
      piece: 'pawn', owner: 1, x: 4, y: 3,
    },
    {
      piece: 'bishop', owner: 1, x: 4, y: 2,
    },
    {
      piece: 'rook', owner: 1, x: 5, y: 2,
    },
    {
      piece: 'queen', owner: 0, x: 6, y: 5,
    }], 1],
    isCheckExpected: [{
      piece: 'pawn', owner: 0, x: 4, y: 4, prevX: 4, prevY: 6,
    }],
    isMateExpected: false,
    testCase: 17,
  },

  {
    args: [[{
      piece: 'king', owner: 1, x: 5, y: 3,
    },
    {
      piece: 'pawn', owner: 0, x: 4, y: 4, prevX: 4, prevY: 6,
    },
    {
      piece: 'rook', owner: 0, x: 5, y: 6,
    },
    {
      piece: 'king', owner: 0, x: 4, y: 7,
    },
    {
      piece: 'knight', owner: 0, x: 2, y: 5,
    },
    {
      piece: 'pawn', owner: 1, x: 5, y: 4,
    },
    {
      piece: 'knight', owner: 1, x: 3, y: 3,
    },
    {
      piece: 'pawn', owner: 1, x: 4, y: 3,
    },
    {
      piece: 'bishop', owner: 1, x: 4, y: 2,
    },
    {
      piece: 'rook', owner: 1, x: 5, y: 2,
    },
    {
      piece: 'queen', owner: 0, x: 6, y: 5,
    }], 1],
    isCheckExpected: [{
      piece: 'pawn', owner: 0, x: 4, y: 4, prevX: 4, prevY: 6,
    }],
    isMateExpected: true,
    testCase: 18,
  },
];

module.exports = tests;
