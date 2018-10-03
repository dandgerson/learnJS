'use strict';

// firs task
function spy(func) {
  let counter = 0;

  function wrapper() {
    wrapper.calls.set(++counter, hash(...arguments));
    console.log( wrapper.calls);
      return func.apply(this, arguments);
  }

  wrapper.calls = new Map();

  function hash() {
    return Array.from(arguments).join();
  }

  return wrapper;
}  

// second task
function delay(f, ms) {

  function wrapper() {
    return setTimeout(() => f.apply(this, arguments), ms);
  }

  return wrapper;
}

// third task
function debounce(f, ms) {
  let lastCall = null;
  function wrapper() {
    let callTime = Date.now();

    if (!lastCall) {
      lastCall = callTime;
      return f.apply(this, arguments);
    }
    if (callTime - lastCall > ms) {
      lastCall = callTime;
      return f.apply(this, arguments);
    }
  }
  return wrapper;
}