'use strict';

export default class User {
  constructor(data) {
    Object.defineProperties(this, {
      '_data': {
        value: data,
      },
    });
    for (let prop in this._data) {
      this[prop] = this._data[prop];
    }
  }
  
}