var arr = [11, 12, 0, 1, 2, 4, 3, 5, 7, 6, 8, 9, 10, 13];
var n = arr.length, t, swap = true;
for (var i = 0; (i < n) && (swap === true); ++i) {
    swap = false;
    for (var j = 0; j < ( n - (i + 1) ); ++j) {
        if ( arr[j] > arr[j + 1] ) {
            t = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = t;
            swap = true;
        }
        console.log('swap = ' + swap);
    } 
    console.log('j = ' + j);
    console.log('i = ' + i);
}




// alert(performance.now());
// alert(arr);
console.log(arr);

