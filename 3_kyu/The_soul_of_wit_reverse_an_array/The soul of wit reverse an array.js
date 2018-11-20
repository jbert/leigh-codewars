// Instructions below
// This to me was really a level 4 or 5 kata

// solution must be within 30 bytes, hence poorly formatted and incorrectly defined function
// this is exactly 30 bytes, I assume it's what the author wanted

reverse=a=>a.map(a.pop,[...a])

// correctly formatted version:  const reverse = a => a.map(a.pop, [...a]);
// usage
// console.log(reverse(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1', '2']));

// to pass I dropped the const, it passes but not good practice as incorrectly defined func
// a similar solution also 30 bytes, formatted correctly:
// const reverse = a => [...a].map(a.pop, a);

// eslint flags warning as defined without const or let but does still export the function
module.exports = reverse;


/*
No time for stories. Reverse an array, return the result. Do whatever you want with the
original array. Don't use Array.prototype.reverse. You only have 30 bytes to spare
Example: [1, 2, 3] → [3, 2, 1]
And this time you won't be able to do the thing from that kata. Require isn't allowed
*/
