let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return {
        done: false,
        value: this.current++,
      }
    } else {
      return { done: true, }
    }
  }
}

// for (let value of range) console.log(value);
console.log([...range]); // work!

let arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  3: true,
  4: 'string',
  5: [1, 2, 3],
  6: { arrayLike: true, iterable: false, },

  length: 7,
}

// console.log([...arrayLike]); not work!
// for (let value of arrayLike) console.log(value); not work!
console.log(Array.from(arrayLike)); // work!
for (let i = 0; i < arrayLike.length; i++) {
  console.log(arrayLike[i]);
}