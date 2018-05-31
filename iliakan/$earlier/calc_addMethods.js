function Calculator() {
    let methods = {};
    methods['+'] = function (a, b) {
        return +((+a + +b).toFixed(10));
    };
    methods['-'] = function (a, b) {
        return +((+a - +b).toFixed(10));
    };

    this.addMethod = function (name, func) {
        return methods[name] = func;
    };

    this.calculate = function (str) {

        let arr = str.split(' ');
        console.log(arr);
        let a = arr[0];
        let op = arr[1];
        let b = arr[2];

        if (isNaN(a) && isNaN(b)) {
            return console.log('operands in str is NaN');
        } else if (isNaN(a) || isNaN(b)) {
            return console.log('one of operands in str is NaN');
        } else if (!methods[op]) {
            return console.log('this operator : ' + op + ' is not added as method whit .addMethod(name, func)');
        }

        return methods[op](a, b);
    };

}