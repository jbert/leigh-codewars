/* Write a function dirReduc which will take an array of strings and returns an array of
strings with the needless directions removed (W<->E or S<->N side by side).
Examples:
dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]) => ["WEST"]
dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH"]) => [] */

function dirReduc(arr) {
  const Arr = arr;
  const regx = /^NORTH,SOUTH|SOUTH,NORTH|EAST,WEST|WEST,EAST$/;

  function check() {
    for (let i = 0; i < Arr.length - 1; i++) {
      const tempPair = [Arr[i], Arr[i + 1]];
      if ((tempPair.toString()).match(regx)) {
        Arr.splice(i, 2);
        check();
      }
    }
  }
  check();
  return Arr;
}

// console.log(dirReduc(['NORTH', 'SOUTH', 'SOUTH', 'EAST', 'WEST', 'NORTH', 'WEST']));

module.exports = dirReduc;
