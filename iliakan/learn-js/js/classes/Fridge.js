'use strict';

class Machine {
    constructor({power}) {
        this._power = power;
        this._enabled = false;
    }

    enable() {
        this._enabled = true;
        console.log('The Fridge is enabled');
    }
    disable() {
        this._enabled = false;
        console.log('The Fridge is disabled');
    }
}

class Fridge extends Machine {
    get food() {
        if (!this._enabled)
            throw new Error(`Before use the Fridge, it's must be enabled`);
        if (!this._food)
            this._food = [];
        return this._food.slice();
    }
    addFood(...items) {
        if (!this._enabled)
            throw new Error(`Before use the Fridge, it's must be enabled`);
        if (!this._food)
            this.food;
        for (let item of [...items]) {
            if (Object.prototype.toString.call(item) === '[object Array]') {
                this.addFood(...item);
            } else {
                if (this._power / 100 <= this._food.length)
                    throw new Error(`Max quantity of food limited by ${this._power / 100}`);
                this._food.push(item);
            }

        }
    }
    getFood(...items) {
        let things = [];
        let self = this;
        if ([...items].includes('all'))
            enumerateItems(...this._food);
        enumerateItems(...items);

        return things;

        function enumerateItems(...items) {
            for (let item of [...items]) {
                if (Object.prototype.toString.call(item) === '[object Array]') {
                    enumerateItems(...item);
                } else {
                    if (self._food.includes(item)) {
                        things.push(self._food[self._food.indexOf(item)]);
                        self._removeFood(item);
                    }
                }

            }
        }
    }

    filterFood(func) {
        return this._food.filter(func);
    }

    _removeFood(item) {
        if (this._food.includes(item)) {
            this._food.splice(this._food.indexOf(item), 1);
        }
    }

    disable() {
        if (this.food.length !== 0)
            throw new Error('The Fridge must be empty');
        this._food = null;
        super.disable();
    }
}

let fridge = new Fridge({
    power: 1000
});
fridge.enable();
fridge.addFood('apple', 'onion', ['tomato', 'peper', 'milk', ['water', 'butter', 'cream']], ['potato', 'icecream']);
console.log(fridge.food);
console.log(fridge.getFood('apple', ['onion', ['milk', 'tomato']], ['butter', 'cream']));
console.log(fridge.food);
//             fridge.disable();
console.log(fridge.getFood('all'));
console.log(fridge.food);
fridge.disable();
console.log(fridge._food);
//             console.log(fridge.food);
fridge.enable();
console.log(fridge.food);
