let tmpMap = new Map ([['piece', 2], ['owner', 3], ['x', 4], ['y', 5]]);

// console.log(tmpMap);
for (const [key, value] of tmpMap.entries()) {
  console.log(key, value);
}
