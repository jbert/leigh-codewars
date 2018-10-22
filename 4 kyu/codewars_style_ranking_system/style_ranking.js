// Instructions & business rules below code
// rank is the current rank, Rank parameter is the new level of Codewars level completed

class User {
  constructor(Rank) {
    this.Rank = Rank;
    if (!this.rank) {
      this.rank = -8;
    }
    if (!this.progress) {
      this.progress = 0;
    }
    this.progUp = 0;
  }

  // does the final calc once progUp known
  progressCalc() {
    this.progress = this.progress + this.progUp;
    if (this.progress < 100) {
      return [this.rank, this.progress];
    }
    if (this.progress >= 100) {
      this.rank += Math.floor(this.progress / 100);
      this.progress = (this.progress % 100);
      if (this.rank === 8) {
        this.progress = 0;
      }
      return [this.rank, this.progress];
    }
    return [this.rank, this.progress];
  }

  // checking if rank going to pass through level zero in which case need to alter for no level 0
  levelProgressCalc() {
    if ((this.rank < 0) && (this.progress + this.progUp < 100)) {
      return this.progressCalc();
    }

    if ((this.rank < 0) && (this.progress + this.progUp >= 100)) {
      if (100 * (-this.rank) > (this.progress + this.progUp)) {
        return this.progressCalc();
      }
      if (100 * (-this.rank) <= (this.progress + this.progUp)) {
        this.rank += 1;
        this.progUp -= 100;
        if (this.rank === 0) {
          this.rank = 1;
        }
        return this.progressCalc();
      }
    }
    if ((this.rank > 0) && (this.Rank > this.rank)) {
      return this.progressCalc();
    }
    return [this.rank, this.progress];
  }

  // where Rank is same as current rank (+3 pts) or one below (+1 pt)
  similarLevelCalc(Rank) {
    if (this.rank === Rank) {
      this.progUp = 3;
    }
    if (this.rank === (this.Rank - 1)) {
      this.progUp = 1;
    }
    return this.levelProgressCalc();
  }

  // where current rank < 0 and Rank > 0 to account for zero level modifier
  levelZeroPassCalc(Rank) {
    this.progUp = 10 * ((this.rank + Rank - 1) ** 2);
    if (this.rank + Rank - 1 === 0) {
      this.progUp = 10 * ((this.rank + Rank + 1) ** 2);
    }
    return this.levelProgressCalc();
  }

  // main function
  // throw error for invalid argument
  incProgress(Rank) {
    if (!((Rank >= -8) && (Rank <= 8) && (Rank !== 0))) {
      throw new Error();
    }
    // case where rank is positive integer and Rank is -1
    if (this.rank > 0 && Rank < 0 && this.rank - Rank === 2) {
      this.progUp = 1;
      return this.progressCalc();
    }
    // case where Rank is lower than 1 level below return current values
    if (this.rank - Rank > 1) {
      return [this.rank, this.progress];
    }
    // case where rank is lower than 0 and Rank > zero to handle the absence of zero level
    if ((this.rank < 0) && (Rank > 0)) {
      return this.levelZeroPassCalc(Rank);
    }
    // case where Rank is same as rank or 1 level below
    if (this.rank === (Rank || (Rank - 1))) {
      return this.similarLevelCalc(Rank);
    }
    // for normal positive integer rank and positive Rank scenarios
    if ((this.rank > 0) && (Rank > this.rank)) {
      this.progUp = 10 * ((this.rank - Rank) ** 2);
      return this.progressCalc(Rank);
    }
    // for all other cases
    this.progUp = 10 * ((this.rank - Rank) ** 2);
    return this.levelProgressCalc(Rank);
  }
}

// for test
module.exports = User;

// usage:
// const user = new User();
// console.log(user.incProgress(-8));
// console.log(user.incProgress(-7));


/*
Write a class called User that is used to calculate the amount that a user will progress
through a ranking system similar to the one Codewars uses.

TODO: create the User class/object
It must support rank, progress and the incProgress(rank) method

TODO: Replace examples and use TDD development by writing your own tests

You can also use Chai (http://chaijs.com/) by requiring it yourself
var expect = require("chai").expect;
var assert = require("chai").assert;
require("chai").should();

Business Rules:
A user starts at rank -8 and can progress all the way to 8.
There is no 0 (zero) rank. The next rank after -1 is 1.
Users will complete activities. These activities also have ranks.
Each time the user completes a ranked activity the users rank progress is updated based off of
the activity's rank
The progress earned from the completed activity is relative to what the user's current rank is
compared to the rank of the activity
A user's rank progress starts off at zero, each time the progress reaches 100 the user's rank is
upgraded to the next level
Any remaining progress earned while in the previous rank will be applied towards the next rank's
progress (we don't throw any progress away). The exception is if there is no other rank left to
progress towards (Once you reach rank 8 there is no more progression).
A user cannot progress beyond rank 8.
The only acceptable range of rank values is -8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8. Any other
value should raise an error.
The progress is scored like so:

Completing an activity that is ranked the same as that of the user's will be worth 3 points
Completing an activity that is ranked one ranking lower than the user's will be worth 1 point
Any activities completed that are ranking 2 levels or more lower than the user's ranking will be
ignored
Completing an activity ranked higher than the current user's rank will accelerate the rank
progression. The greater the difference between rankings the more the progression will be
increased. The formula is 10 * d * d where d equals the difference in ranking between the
activity and the user.
Logic Examples:
If a user ranked -8 completes an activity ranked -7 they will receive 10 progress
If a user ranked -8 completes an activity ranked -6 they will receive 40 progress
If a user ranked -8 completes an activity ranked -5 they will receive 90 progress
If a user ranked -8 completes an activity ranked -4 they will receive 160 progress, resulting in
the user being upgraded to rank -7 and having earned 60 progress towards their next rank
If a user ranked -1 completes an activity ranked 1 they will receive 10 progress (remember, zero
rank is ignored)
Code Usage Examples:
var user = new User()
user.rank // => -8
user.progress // => 0
user.incProgress(-7)
user.progress // => 10
user.incProgress(-5) // will add 90 progress
user.progress # => 0 // progress is now zero
user.rank # => -7 // rank was upgraded to -7
Note: Codewars no longer uses this algorithm for its own ranking system. It uses a pure Math
based solution that gives consistent results no matter what order a set of ranked activities are
completed at
*/
