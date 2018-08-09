Promise.resolve(123).then(::console.log.bind());

/*
(...args) => this.handleStuff('stuff', ...args);

this.handleStuff.bind(this, 'stuff');
*/
