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
      this.maxAscent = 0;
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

    findUpRequests() {
      for (let k = 0; k < this.allQueue.length; k++) {
        if (this.allQueue[k][0] >= this.currentFloor) {
          if (this.allQueue[k][1] > this.allQueue[k][0]) {
            this.upRequests.push(this.allQueue[k]);
          }
        }
      }
      return this.upRequests;
    }

    findTopWaitee() {
      const highestWaitee = this.allQueue[this.allQueue.length - 1];
      return highestWaitee;
    }

    checkHighestStop(topWaitee) {
      const tempArr = [];
      for (let i = 0; i < this.allQueue.length; i++) {
        tempArr.push(this.allQueue[i][1]);
      }
      const topDesired = Math.max(...tempArr);
      if (topWaitee[0] > topDesired) {
        this.upRequests.push(topWaitee);
        // eslint recommends tmpLocal creation - destructuring
        const tmpLocal = topWaitee[0];
        this.maxAscent = tmpLocal;
      } else {
        this.maxAscent = topDesired;
      }
    }

    addUpStops() {
      const tmpSet = new Set();
      for (let i = 0; i < this.upRequests.length; i++) {
        tmpSet.add(this.upRequests[i][0]);
      }
      tmpSet.forEach(uniqFloor => this.stopsList.push(uniqFloor));
    }

    moveLiftUp() {
      for (let i = this.currentFloor; i < this.maxAscent + 1; i++) {
        for (let j = 0; j < this.upRequests.length; j++) {
          if (i === this.upRequests[j][0]) {
            if (this.onBoard.length < this.cap) {
              this.onBoard.push(this.upRequests[j]);
              for (let k = 0; k < this.allQueue.length; k++) {
                if (this.onBoard[this.onBoard.length - 1][2] === this.allQueue[k][2]) {
                  this.allQueue.splice(k, 1);
                }
              }
            }
          }
          if (this.onBoard.length > 0) {
            this.onBoard.forEach((occupant, index) => {
              if (i === occupant[1]) {
                this.onBoard.splice(index, 1);
              }
            });
          }
        }
        this.currentFloor = i;
      }
      this.direction = 'down';
      console.log(this.onBoard);
    }

    startAscent() {
      this.upRequests = [];
      this.findUpRequests();
      this.checkHighestStop(this.findTopWaitee());
      this.addUpStops();
      this.moveLiftUp();

    }

    startDescent() {
      true;
    }

    controller() {
      this.buildWaiting();
      let temp = 0;
      while (this.allQueue.length > 0 && temp < 10) {
        temp++;
        if (this.direction === 'up') {
          this.startAscent();
        }
        if (this.direction === 'down') {
          this.startDescent();
        }
      }
      // return this.stopsList;
    }
  }

  const lift = new Lift();
  return lift.controller();
};

console.log(theLift([[], [], [5, 5, 5, 5, 5, 5, 5, 5], [], [2, 3, 3], [], [5, 2]], 5));


/*
// had to re-do this:
moveLiftUp() {
      for (let i = this.currentFloor; i < this.maxAscent + 1; i++) {
        for (let j = 0; j < this.upRequests.length; j++) {
          if (i === this.upRequests[j][0]) {
            if (this.onBoard.length < this.cap) {
              this.onBoard.push(this.upRequests[j]);
            }
            if (this.onBoard.length > 0) {
              this.onBoard.forEach((occupant) => {
                if (i === occupant[1]) {
                  for (let k = 0; k < this.allQueue.length; k++) {
                    if (this.allQueue[k][2] === occupant[2]) {
                      this.allQueue.splice(k, 1);
                      this.onBoard.splice() ??
                      this.cap--;
                    }
                  }
                }
              });
            }
          }
        }
        this.currentFloor = i;
      }
      this.direction = 'down';
    }




  // highest or lowest floor
  function locateTargetFloor() {
    if (waitArr.length > 0) {
      if (direction === 'up') {
        targetFloor = Math.max(...waitArr[1]);
      }
      if (direction === 'down') {
        targetFloor = Math.min(...waitArr[1]);
      }
    }
    return stops.push([0]);
  }

  function buildStops() {
    currentAscDescentQueueArr = [];
    if (currFloor < targetFloor) {
      for (let a = 0; a < waitArr.length; a++) {
        if (waitArr[a][1] > currFloor) {
          currentAscDescentQueueArr.push([waitArr[a], a]);
        }
      }
    }
    if (currFloor > targetFloor) {
      for (let a = waitArr.length; a >= 0; a--) {
        if (waitArr[a][1] < currFloor) {
          currentAscDescentQueueArr.push([waitArr[a], a]);
        }
      }
    }
  }

  function reduceRelationalCounter(indx) {
    if (currentAscDescentQueueArr.length > 0) {
      for (let f = indx; f < currentAscDescentQueueArr.length; f++) {
        currentAscDescentQueueArr[f][1]--;
      }
    }
  }

  function embark() {
    if (onBoard.length < cap) {
      for (let c = 0; c < currentAscDescentQueueArr.length; c++) {
        while (onBoard.length < cap) {
          onBoard.push(currentAscDescentQueueArr.splice(c, 1));
          c--;
        }
      }
    }
  }

  function alight() {
    if (currFloor < targetFloor) {
      let breakDoubleLoop = false;
      for (let d = currFloor; d < targetFloor + 1; d++) {
        if (!breakDoubleLoop) {
          currFloor++;
          for (let e = 0; e < onBoard.length; e++) {
            if (onBoard[e][0][0][1] === currFloor) {
              stops.push(currFloor);
              waitArr.splice(onBoard[e][0][1], 1);
              reduceRelationalCounter(onBoard[e][0][1]);
              onBoard.splice(e, 1);
              e--;
              breakDoubleLoop = true;
              break;
            }
          }
        }
      }
    }
  }

  buildWaitArr();
  locateTargetFloor();
  buildStops();
  embark();
  alight();
  return [onBoard[0][0][0][1], currentAscDescentQueueArr];
};

console.log(theLift([[], [], [5, 5, 5], [], [2, 3, 3], [], [5, 2]], 5));


/*
const theLift = function theLift(queues, capacity) {
  const goUp = state => ({
    up: (spell) => {
      console.log(`${state.name} casts ${spell}!`);
      state.mana--;
    },
  });

  const goDown = state => ({
    fight: () => {
      console.log(`${state.name} slashes at the foe!`);
      state.stamina--;
    },
  });

  const liftBuildFactory = (name) => {
    const state = {
      name,
      health: 100,
      stamina: 100,
    };
    return Object.assign(state, canFight(state));
  };

  const paladin = (name) => {
    const state = {
      name,
      health: 100,
      mana: 100,
      stamina: 100,
    };
  
    return Object.assign(state, canCast(state), canFight(state));
  };

  const roland = paladin('Roland');

}

module.exports = theLift;


/* full tests:
 up
 Log
[ [], [], [ 5, 5, 5 ], [], [], [], [] ] 5
Expected: '[0, 2, 5, 0]', instead got: 'undefined'
Completed in 2ms
 down
 Log
[ [], [], [ 1, 1 ], [], [], [], [] ] 5
Expected: '[0, 2, 1, 0]', instead got: 'undefined'
 up and up
 Log
[ [], [ 3 ], [ 4 ], [], [ 5 ], [], [] ] 5
Expected: '[0, 1, 2, 3, 4, 5, 0]', instead got: 'undefined'
 down and down
 Log
[ [], [ 0 ], [], [], [ 2 ], [ 3 ], [] ] 5
Expected: '[0, 5, 4, 3, 2, 1, 0]', instead got: 'undefined'
Completed in 4ms
 Others
 up and down
 Log
[ [ 3 ], [ 2 ], [ 0 ], [ 2 ], [], [], [ 5 ] ] 5
Expected: '[0, 1, 2, 3, 6, 5, 3, 2, 0]', instead got: 'undefined'
 yo-yo
 Log
[ [], [], [ 4, 4, 4, 4 ], [], [ 2, 2, 2, 2 ], [], [] ] 2
Expected: '[0, 2, 4, 2, 4, 2, 0]', instead got: 'undefined'
 enter on ground floor
 Log
[ [ 1, 2, 3, 4 ], [], [], [], [], [], [] ] 5
Expected: '[0, 1, 2, 3, 4, 0]', instead got: 'undefined'
 lift full (up)
 Log
[ [ 3, 3, 3, 3, 3, 3 ], [], [], [], [], [], [] ] 5
Expected: '[0, 3, 0, 3, 0]', instead got: 'undefined'
 lift full (down)
 Log
[ [], [], [], [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ], [], [], [] ] 5
Expected: '[0, 3, 1, 3, 1, 3, 1, 0]', instead got: 'undefined'
Completed in 1ms
 lift full (up and down)
 Log
[ [ 3, 3, 3, 3, 3, 3 ], [], [], [], [], [ 4, 4, 4, 4, 4, 4 ], [] ] 5
Expected: '[0, 3, 5, 4, 0, 3, 5, 4, 0]', instead got: 'undefined'
 tricky queues
 Log
[ [], [ 0, 0, 0, 6 ], [], [], [], [ 6, 6, 0, 0, 0, 6 ], [] ] 5
Expected: '[0, 1, 5, 6, 5, 1, 0, 1, 0]', instead got: 'undefined'
 highlander
 Log
[ [], [ 2 ], [ 3, 3, 3 ], [ 1 ], [], [], [] ] 1
Expected: '[0, 1, 2, 3, 1, 2, 3, 2, 3, 0]', instead got: 'undefined'
 fire drill!
 Log
[ [],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ] ] 5
Expected: '[0, 6, 5, 4, 3, 2, 1, 0, 5, 4, 3, 2, 1, 0, 4, 3, 2, 1, 0, 3, 2, 1, 0, 1, 0]', instead got: 'undefined'
*/

/*
Synopsis
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
Each floor has both UP and DOWN Lift-call buttons (except top and ground floors which have only DOWN and UP respectively)
The Lift never changes direction until there are no more people wanting to get on/off in the direction it is already travelling
When empty the Lift tries to be smart. For example,
If it was going up then it may continue up to collect the highest floor person wanting to go down
If it was going down then it may continue down to collect the lowest floor person wanting to go up
The Lift has a maximum capacity of people
When called, the Lift will stop at a floor even if it is full, although unless somebody gets off nobody else can get on!
If the lift is empty, and no people are waiting, then it will return to the ground floor
People Rules
People are in "queues" that represent their order of arrival to wait for the Lift
All people can press the UP/DOWN Lift-call buttons
Only people going the same direction as the Lift may enter it, and they do so according to their "queue" order
If a person is unable to enter a full Lift, they will press the UP/DOWN Lift-call button again after it has departed without them
Kata Task
Get all the people to the floors they want to go to while obeying the Lift rules and the People rules
Return a list of all floors that the Lift stopped at (in the order visited!)
NOTE: The Lift always starts on the ground floor (and people waiting on the ground floor may enter immediately)

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
