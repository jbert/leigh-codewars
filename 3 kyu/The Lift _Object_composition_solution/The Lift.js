// Object composition solution -> concatenation inheritance

// intentionally mutating state param, remove eslint warning on param reassign for state object
/* eslint no-param-reassign:["error",
{ "props": true, "ignorePropertyModificationsFor":["state"]}] */

const composeLiftFunctionality = state => ({
  // allQueue array -> [waiting on floor, desired floor, unique reference for later retrieval]
  buildWaiting: () => {
    let k = 0;
    for (let i = 0; i < state.queues.length; i++) {
      for (let j = 0; j < state.queues[i].length; j++) {
        state.allQueue.push([i, state.queues[i][j], k++]);
      }
    }
  },

  // find up requests
  findUpRequests() {
    for (let k = 0; k < state.allQueue.length; k++) {
      if (state.allQueue[k][0] >= state.currentFloor) {
        if (state.allQueue[k][1] > state.allQueue[k][0]) {
          state.upRequests.push(state.allQueue[k]);
        }
      }
    }
  },

  findTopWaitee() {
    const highestWaitee = state.allQueue[state.allQueue.length - 1];
    return highestWaitee || 0;
  },

  checkHighestStop(topWaitee) {
    const tempArr = [];
    // awaiting collection
    if (state.allQueue.length > 0) {
      for (let i = 0; i < state.allQueue.length; i++) {
        tempArr.push(state.allQueue[i][1]);
      }
    }
    // collected, ie onBoard
    if (state.allQueue.length === 0) {
      for (let a = 0; a < state.onBoard.length; a++) {
        tempArr.push(state.onBoard[a][1]);
      }
    }
    // find maxAscent
    const topDesired = Math.max(...tempArr);
    if (topWaitee[0] > topDesired) {
      // eslint recommends tmpLocal creation - destructuring
      const tmpLocal = topWaitee[0];
      state.maxAscent = tmpLocal;
    } else {
      state.maxAscent = topDesired;
    }
  },

  // move up
  moveLiftUp() {
    const currOnBoardRefArr = [];
    const tmpSet = new Set();
    // ensure unique occupant Reference later
    if (state.onBoard.length > 0) {
      for (let b = 0; b < state.onBoard.length; b++) {
        currOnBoardRefArr.push(state.onBoard[b][2]);
      }
    }
    // cycle up floors from current
    for (let i = state.currentFloor; i < state.maxAscent + 1; i++) {
      if (state.onBoard.length > 0) {
        let count = 0;
        // slice() to iterate over a copy and then mutate original, altering index with count
        state.onBoard.slice().forEach((occupant, index) => {
          if (i === occupant[1]) {
            tmpSet.add(i);
            state.onBoard.splice(index - count++, 1);
          }
        });
      }
      // for each upRequest add to tmpSet
      for (let j = 0; j < state.upRequests.length; j++) {
        if (i === state.upRequests[j][0]) {
          tmpSet.add(i);
          if (state.onBoard.length < state.cap &&
          !currOnBoardRefArr.includes(state.upRequests[j][2])) {
            state.onBoard.push(state.upRequests[j]);
            // remove from allQueue
            for (let k = 0; k < state.allQueue.length; k++) {
              if (state.onBoard[state.onBoard.length - 1][2] === state.allQueue[k][2]) {
                state.allQueue.splice(k, 1);
                break;
              }
            }
          }
        }
      }
      state.currentFloor = i;
    }
    // set ensures unique floor, ordered
    const orderedStops = (Array.from(tmpSet).sort((a, b) => a - b));
    orderedStops.forEach(stop => state.stopsList.push(stop));
    state.direction = 'down';
  },

  findDownRequests() {
    for (let k = 0; k < state.allQueue.length; k++) {
      if (state.allQueue[k][0] <= state.currentFloor) {
        if (state.allQueue[k][1] < state.allQueue[k][0]) {
          state.downRequests.push(state.allQueue[k]);
        }
      }
    }
  },

  findLowestWaitee() {
    const lowestWaitee = state.allQueue[0];
    return lowestWaitee || 0;
  },

  findLowestStop(lowestWaitee) {
    const tempArr = [];
    if (state.allQueue.length > 0) {
      for (let i = 0; i < state.allQueue.length; i++) {
        tempArr.push(state.allQueue[i][1]);
      }
    }
    if (state.allQueue.length === 0) {
      if (state.onBoard.length > 0) {
        for (let a = 0; a < state.onBoard.length; a++) {
          tempArr.push(state.onBoard[a][1]);
        }
      }
    }
    const lowestDesired = Math.min(...tempArr);
    if (lowestWaitee[0] < lowestDesired) {
      // eslint recommends tmpLocal creation - destructuring
      const tmpLocal = lowestWaitee[0];
      state.minDescent = tmpLocal;
    } else {
      state.minDescent = lowestDesired;
    }
  },

  moveLiftDown() {
    const currOnBoardRefArr = [];
    const tmpSet = new Set();
    if (state.onBoard.length > 0) {
      for (let b = 0; b < state.onBoard.length; b++) {
        currOnBoardRefArr.push(state.onBoard[b][2]);
      }
    }
    for (let i = state.currentFloor; i >= state.minDescent; i--) {
      if (state.onBoard.length > 0) {
        let count = 0;
        // slice() to iterate over copy and mutate original, altering index with count
        state.onBoard.slice().forEach((occupant, index) => {
          if (i === occupant[1]) {
            tmpSet.add(i);
            state.onBoard.splice(index - count++, 1);
          }
        });
      }
      for (let j = 0; j < state.downRequests.length; j++) {
        if (i === state.downRequests[j][0]) {
          tmpSet.add(i);
          if (state.onBoard.length < state.cap &&
          !currOnBoardRefArr.includes(state.downRequests[j][2])) {
            state.onBoard.push(state.downRequests[j]);
            for (let k = 0; k < state.allQueue.length; k++) {
              if (state.onBoard[state.onBoard.length - 1][2] === state.allQueue[k][2]) {
                state.allQueue.splice(k, 1);
                break;
              }
            }
          }
        }
      }
      state.currentFloor = i;
    }
    const orderedStops = (Array.from(tmpSet).sort((a, b) => b - a));
    orderedStops.forEach(stop => state.stopsList.push(stop));
    state.direction = 'up';
  },

  // ascent
  startAscent() {
    state.upRequests = [];
    this.findUpRequests();
    this.checkHighestStop(this.findTopWaitee());
    this.moveLiftUp();
  },

  // descent
  startDescent() {
    state.downRequests = [];
    this.findDownRequests();
    this.findLowestStop(this.findLowestWaitee());
    this.moveLiftDown();
  },

  // lift controller logic
  controller() {
    this.buildWaiting();
    while (state.allQueue.length > 0 || state.onBoard.length > 0) {
      if (state.direction === 'up') {
        this.startAscent();
      }
      if (state.direction === 'down') {
        this.startDescent();
      }
    }
    if (state.stopsList[state.stopsList.length - 1] !== 0) {
      state.stopsList.push(0);
    }
    // remove any consecutive duplicated floors
    state.stopsList = state.stopsList.filter((item, pos, arr) => item !== arr[pos - 1]);
    return state.stopsList;
  },
});

const theLift = (queues, capacity) => {
  const state = {
    queues,
    cap: capacity,
    currentFloor: 0,
    direction: 'up',
    stopsList: [0],
    allQueue: [],
    upRequests: [],
    downRequests: [],
    maxAscent: 0,
    minDescent: 0,
    onBoard: [],
  };
  return Object.assign(
    {},
    composeLiftFunctionality(state),
  );
};

module.exports = theLift;

// manual usage
// const lift = theLift([[1, 2, 4, 4], [4, 2, 0, 3], [4, 4, 1], [], [2]], 2);
// console.log(lift.controller());

/*
Kata specification:

A multi-floor building has a Lift in it.
People are queued on different floors waiting for the Lift.
Some people want to go up. Some people want to go down.

The floor they want to go to is represented by a number (i.e. when they enter the Lift this is
the button they will press)

BEFORE (people waiting in queues)               AFTER (people at their destinations)
                   +--+                                          +--+
  /----------------|  |----------------\        /----------------|  |----------------\
10|                |  | 1,4,3,2        |      10|             10 |  |                |
  |----------------|  |----------------|        |----------------|  |----------------|
 9|                |  | 1,10,2         |       9|                |  |                |
  |----------------|  |----------------|        |----------------|  |----------------|
 8|                |  |                |       8|                |  |                |
  |----------------|  |----------------|        |----------------|  |----------------|
 7|                |  | 3,6,4,5,6      |       7|                |  |                |
  |----------------|  |----------------|        |----------------|  |----------------|
 6|                |  |                |       6|          6,6,6 |  |                |
  |----------------|  |----------------|        |----------------|  |----------------|
 5|                |  |                |       5|            5,5 |  |                |
  |----------------|  |----------------|        |----------------|  |----------------|
 4|                |  | 0,0,0          |       4|          4,4,4 |  |                |
  |----------------|  |----------------|        |----------------|  |----------------|
 3|                |  |                |       3|            3,3 |  |                |
  |----------------|  |----------------|        |----------------|  |----------------|
 2|                |  | 4              |       2|          2,2,2 |  |                |
  |----------------|  |----------------|        |----------------|  |----------------|
 1|                |  | 6,5,2          |       1|            1,1 |  |                |
  |----------------|  |----------------|        |----------------|  |----------------|
 G|                |  |                |       G|          0,0,0 |  |                |
  |====================================|        |====================================|
Rules
Lift Rules
The Lift only goes up or down!
Each floor has both UP and DOWN Lift-call buttons (except top and ground floors which have only
DOWN and UP respectively)
The Lift never changes direction until there are no more people wanting to get on/off in the
direction it is already travelling
When empty the Lift tries to be smart. For example,
If it was going up then it may continue up to collect the highest floor person wanting to go down
If it was going down then it may continue down to collect the lowest floor person wanting to go up
The Lift has a maximum capacity of people
When called, the Lift will stop at a floor even if it is full, although unless somebody gets off
nobody else can get on!
If the lift is empty, and no people are waiting, then it will return to the ground floor
People Rules
People are in "queues" that represent their order of arrival to wait for the Lift
All people can press the UP/DOWN Lift-call buttons
Only people going the same direction as the Lift may enter it, and they do so according to their
"queue" order
If a person is unable to enter a full Lift, they will press the UP/DOWN Lift-call button again
after it has departed without them
Kata Task
Get all the people to the floors they want to go to while obeying the Lift rules and the People
rules
Return a list of all floors that the Lift stopped at (in the order visited!)
NOTE: The Lift always starts on the ground floor (and people waiting on the ground floor may
enter immediately)

I/O
Input
queues a list of queues of people for all floors of the building.
The height of the building varies
0 = the ground floor
Not all floors have queues
Queue index [0] is the "head" of the queue
Numbers indicate which floor the person wants go to
capacity maximum number of people allowed in the lift
Parameter validation - All input parameters can be assumed OK. No need to check for things like:

People wanting to go to floors that do not exist
People wanting to take the Lift to the floor they are already on
Buildings with < 2 floors
Basements
Output
A list of all floors that the Lift stopped at (in the order visited!)
*/