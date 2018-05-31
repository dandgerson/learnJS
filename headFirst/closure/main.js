document.querySelector('body').style.backgroundColor = 'grey';
document.querySelector('body').style.margin = '10px';
document.querySelector('button').style.margin = '10px';
document.querySelector('div').style.padding = '10px';

// Lexical inviroment

let justALet = 'oh, don\'t you worry about it, I\'m GLOBAL';

function whereAreYou() {
    let justALet = 'Just an every day LOCAL';

    function inner() {
        return justALet;
    }

    return inner;
}

let innerFunction = whereAreYou();
let result = innerFunction();
console.log(result);

// counter

function makeCounter() {
    let count = 0;
    function counter() {
        count++;
        return count;
    }
    return counter;
}


function makeTimer(doneMessage, n) {

    setTimeout(function(){console.log(doneMessage);}, n);
}

makeTimer('Cookies are done!', 1000);

window.onload = function() {
    let count = 0;
    let message = 'You clicked me ';
    let div = document.querySelector('#message');
    let button = document.querySelector('#clickme');

    button.onclick = function() {
        count++;
        div.innerHTML = message + count + ' times!';
    }
}