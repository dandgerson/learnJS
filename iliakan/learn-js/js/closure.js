function sum(a) {
      return function(b) {
        return a + b;
      }
}

function inBetween(from, to) {
  return function(x) {
    return x >= from && x <= to;
  }
}

function inArray(array) {
  return function(x) {
    return array.includes(x);
  }
}

let arr = [1, 2, 3, 4, 5, 6, 7];

let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

function byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1; 
}

function makeArmy() {
  let shooters = [];
  let i = 0;
  while (i < 10) {
    let n = i;
    let shooter = function() { // shooter function
      console.log( n ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}
let army = makeArmy();
army[0]();
army[5]();