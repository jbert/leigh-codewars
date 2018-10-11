// promise with a timeout

function chck() {
  console.log('There is the 2 sec delay, then this is printed from the console log');
  return 'And this is returned from here and passed..';
}

const promiseA = new Promise((resolve, reject) => {
  const a = 2;
  setTimeout(() => {
    resolve(chck()); // function defined elsewhere
  }, 2000);
  if (a !== 2) {
    (reject(new Error()));
  }
});

Promise.resolve(promiseA).then((a) => {
  console.log(`${a} through to the .then here`);
  // omitted an actual return value from here on tis occasion
}).catch(new Error());
