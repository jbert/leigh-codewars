// Kata requirements below

const theLift = function theLift(queues, capacity) {
  class Lift {
    constructor() {
      this.queues = queues;
      this.cap = capacity;
      this.currentFloor = 0;
      this.direction = 'up';
      this.stopsList = [0];
      this.allQueue = [];
      this.upRequests = [];
      this.downRequests = [];
      this.maxAscent = 0;
      this.minDescent = 0;
      this.onBoard = [];
    }

    // allQueue array -> [waiting on floor, desired floor, unique reference for later retrieval]
    buildWaiting() {
      let k = 0;
      for (let i = 0; i < this.queues.length; i++) {
        for (let j = 0; j < this.queues[i].length; j++) {
          this.allQueue.push([i, this.queues[i][j], k++]);
        }
      }
    }

    // find up requests
    findUpRequests() {
      for (let k = 0; k < this.allQueue.length; k++) {
        if (this.allQueue[k][0] >= this.currentFloor) {
          if (this.allQueue[k][1] > this.allQueue[k][0]) {
            this.upRequests.push(this.allQueue[k]);
          }
        }
      }
    }

    findTopWaitee() {
      const highestWaitee = this.allQueue[this.allQueue.length - 1];
      return highestWaitee || 0;
    }

    checkHighestStop(topWaitee) {
      const tempArr = [];
      // awaiting collection
      if (this.allQueue.length > 0) {
        for (let i = 0; i < this.allQueue.length; i++) {
          tempArr.push(this.allQueue[i][1]);
        }
      }
      // collected, ie onBoard
      if (this.allQueue.length === 0) {
        for (let a = 0; a < this.onBoard.length; a++) {
          tempArr.push(this.onBoard[a][1]);
        }
      }
      // find maxAscent
      const topDesired = Math.max(...tempArr);
      if (topWaitee[0] > topDesired) {
        // eslint recommends tmpLocal creation - destructuring
        const tmpLocal = topWaitee[0];
        this.maxAscent = tmpLocal;
      } else {
        this.maxAscent = topDesired;
      }
    }

    // move up
    moveLiftUp() {
      const currOnBoardRefArr = [];
      const tmpSet = new Set();

      // ensure unique occupant Reference later
      if (this.onBoard.length > 0) {
        for (let b = 0; b < this.onBoard.length; b++) {
          currOnBoardRefArr.push(this.onBoard[b][2]);
        }
      }

      // cycle up floors from current
      for (let i = this.currentFloor; i < this.maxAscent + 1; i++) {
        if (this.onBoard.length > 0) {
          let count = 0;
          // slice() to iterate over a copy and then mutate original, altering index with count
          this.onBoard.slice().forEach((occupant, index) => {
            if (i === occupant[1]) {
              tmpSet.add(i);
              this.onBoard.splice(index - count++, 1);
            }
          });
        }
        // for each upRequest add to tmpSet
        for (let j = 0; j < this.upRequests.length; j++) {
          if (i === this.upRequests[j][0]) {
            tmpSet.add(i);
            if (this.onBoard.length < this.cap &&
            !currOnBoardRefArr.includes(this.upRequests[j][2])) {
              this.onBoard.push(this.upRequests[j]);
              // remove from allQueue
              for (let k = 0; k < this.allQueue.length; k++) {
                if (this.onBoard[this.onBoard.length - 1][2] === this.allQueue[k][2]) {
                  this.allQueue.splice(k, 1);
                  break;
                }
              }
            }
          }
        }
        this.currentFloor = i;
      }
      // set ensures unique floor, ordered
      const orderedStops = (Array.from(tmpSet).sort((a, b) => a - b));
      orderedStops.forEach(stop => this.stopsList.push(stop));
      this.direction = 'down';
      // console.log(this.onBoard);
    }

    findDownRequests() {
      for (let k = 0; k < this.allQueue.length; k++) {
        if (this.allQueue[k][0] <= this.currentFloor) {
          if (this.allQueue[k][1] < this.allQueue[k][0]) {
            this.downRequests.push(this.allQueue[k]);
          }
        }
      }
    }

    findLowestWaitee() {
      const lowestWaitee = this.allQueue[0];
      return lowestWaitee || 0;
    }

    findLowestStop(lowestWaitee) {
      const tempArr = [];
      if (this.allQueue.length > 0) {
        for (let i = 0; i < this.allQueue.length; i++) {
          tempArr.push(this.allQueue[i][1]);
        }
      }
      if (this.allQueue.length === 0) {
        if (this.onBoard.length > 0) {
          for (let a = 0; a < this.onBoard.length; a++) {
            tempArr.push(this.onBoard[a][1]);
          }
        }
      }
      const lowestDesired = Math.min(...tempArr);
      if (lowestWaitee[0] < lowestDesired) {
        // eslint recommends tmpLocal creation - destructuring
        const tmpLocal = lowestWaitee[0];
        this.minDescent = tmpLocal;
      } else {
        this.minDescent = lowestDesired;
      }
    }

    moveLiftDown() {
      const currOnBoardRefArr = [];
      const tmpSet = new Set();
      if (this.onBoard.length > 0) {
        for (let b = 0; b < this.onBoard.length; b++) {
          currOnBoardRefArr.push(this.onBoard[b][2]);
        }
      }
      for (let i = this.currentFloor; i >= this.minDescent; i--) {
        if (this.onBoard.length > 0) {
          let count = 0;
          // slice() to iterate over copy and mutate original, altering index with count
          this.onBoard.slice().forEach((occupant, index) => {
            if (i === occupant[1]) {
              tmpSet.add(i);
              this.onBoard.splice(index - count++, 1);
            }
          });
        }
        for (let j = 0; j < this.downRequests.length; j++) {
          if (i === this.downRequests[j][0]) {
            tmpSet.add(i);
            if (this.onBoard.length < this.cap &&
            !currOnBoardRefArr.includes(this.downRequests[j][2])) {
              this.onBoard.push(this.downRequests[j]);
              for (let k = 0; k < this.allQueue.length; k++) {
                if (this.onBoard[this.onBoard.length - 1][2] === this.allQueue[k][2]) {
                  this.allQueue.splice(k, 1);
                  break;
                }
              }
            }
          }
        }
        this.currentFloor = i;
      }
      const orderedStops = (Array.from(tmpSet).sort((a, b) => b - a));
      orderedStops.forEach(stop => this.stopsList.push(stop));
      this.direction = 'up';
    }

    // ascent
    startAscent() {
      this.upRequests = [];
      this.findUpRequests();
      this.checkHighestStop(this.findTopWaitee());
      this.moveLiftUp();
    }

    // descent
    startDescent() {
      this.downRequests = [];
      this.findDownRequests();
      this.findLowestStop(this.findLowestWaitee());
      this.moveLiftDown();
    }

    // main lift logic, cycles 'up' and 'down' until allQueue & onBoard are length 0
    controller() {
      this.buildWaiting();
      while (this.allQueue.length > 0 || this.onBoard.length > 0) {
        if (this.direction === 'up') {
          this.startAscent();
        }
        if (this.direction === 'down') {
          this.startDescent();
        }
      }
      // make sure returns to ground on finish
      if (this.stopsList[this.stopsList.length - 1] !== 0) {
        this.stopsList.push(0);
      }

      // remove any consecutive duplicated floors
      this.stopsList = this.stopsList.filter((item, pos, arr) => item !== arr[pos - 1]);
      return this.stopsList;
    }
  }

  const lift = new Lift();
  return lift.controller();
};

module.exports = theLift;

// manual use:
// console.log(theLift([[1, 2, 4, 4], [4, 2, 0, 3], [4, 4, 1], [], [2]], 2));
// expected: [ 0, 1, 2, 4, 2, 1, 0, 1, 2, 4, 1, 2, 3, 4, 0 ]

/*
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
