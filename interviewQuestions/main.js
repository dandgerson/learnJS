document.body.style.backgroundColor = 'grey';

function sum(a) {
    return function(b) {
        return a + b;
    };
}