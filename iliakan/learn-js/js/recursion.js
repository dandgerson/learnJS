function factorial(n) {
  return n ? n * factorial(n - 1): 1;
}

function fib(n) {
  let a = 1; let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

function printList(list) {
  console.log(list.value);
  if (list.next) printList(list.next);
}

function printListReverse(list) {
  if (list.next) printListReverse(list.next);
  console.log(list.value);
}

function printListLoop(list) {
  console.log(list.value);
  while (list.next) {
    list = list.next;
    console.log(list.value);
  }
}

function printListLoopReverse(list) {
  let arr = [];
  arr.push(list.value);
  do {
    list = list.next;
    arr.push(list.value);
  } while (list.next);
  for (let value of arr.reverse()) console.log(value);
}

let list = {
  value: 1,
  next : {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
}