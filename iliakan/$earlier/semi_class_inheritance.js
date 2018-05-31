function Machine(power) {
    this._power = power;
    this._enabled = false;
}

Machine.prototype = {
    constructor: Machine,

    getPower() {
        return this._power;
    },

    enable() {
        if(this._enabled)
            throw new Error(`Устройство уже включено.`);
        this._enabled = true;
    },

    disable() {
        if(!this._enabled)
            throw new Error(`Устройство уже выключено.`);
        this._enabled = false;
    },

    getState() {
        return this._enabled;
    },
};

function CoffeeMachine(power, capacity) {
    Machine.apply(this, arguments);
    this._capacity = capacity;
    this._waterAmount = 0;
    this._timerId = null;
}

CoffeeMachine.prototype = {
    constructor : CoffeeMachine,

    WATER_HEAT_CAPACITY : 4200,

    _checkSafety() {
        if(this._enabled)
            throw new Error('Кофеварка должна быть в выключенном состоянии!');
    },

    _checkState() {
        if(!this._enabled)
            throw new Error('Перед использованием кофеварку необходимо включить.');
    },

    getCapacity() {
        return this._capacity;
    },

    getWaterAmount() {
        return this._waterAmount;
    },

    setWaterAmount(amount) {
        this._checkSafety();
        if(amount < 0)
            throw new Error('Объём воды можеть быть только положительным.');
        if(amount > this._capacity)
            throw new Error('Объём воды не должен превышать ёмкость кофеварки.');
    
        this._waterAmount = amount;
    },

    addWater(amount) {
        this.setWaterAmount(this._waterAmount + amount);
    },

    _getBoilTime() {
        return this._waterAmount * this.WATER_HEAT_CAPACITY * 80 / this._power;
    },

    _onReady() {
        console.log( 'Кофе готово!' );
    },

    _checkWaterAmountMin() {
        if(this._waterAmount < 100) {
            this.disable();
            throw new Error(`Кофеварка не может быть запущена.\n
            Объём воды меньше минимально допустимого!\n
            Минимально допустимый объём воды : '100 ml'.\n
            Сработало автоматическое выключение!`);
        }
    },

    run() {
        this._checkState();
        this._checkWaterAmountMin();
        let self = this;
        this._timerId = setTimeout( function() {
            self._timerId = null;
            self._onReady();
        }, this._getBoilTime());
    },

    stop() {
        if(!this.isRunning())
            throw new Error(`Кофеварка не запущена.`);
        clearTimeout(this._timerId);
        this._timerId = null;
    },

    isRunning() {
        return this._timerId !== null;
    },

    setOnReady(func) {
        this._onReady = func;
    },

    enable() {
        Machine.prototype.enable.apply(this, arguments);
        this.run();
    },

    disable() {
        if(this.isRunning())
            this.stop();
        Machine.prototype.disable.apply(this, arguments);
    },
    
    __proto__ : Machine.prototype,
};

function Fridge(power) {
    Machine.apply(this, arguments);

    this._FRIDGE_CAPACITY = this._power / 100;
    this._currentCapacity = 0;

    this._food = [];
}

Fridge.prototype = {
    constructor : Fridge,

    addFood(...args) {
        if(!this._enabled)
            throw new Error(`Холодильник выключен.`);
        
        if(this._currentCapacity + arguments.length > this._FRIDGE_CAPACITY)
            throw new Error (`Холодильник рассчитан на ${this._FRIDGE_CAPACITY} продуктов.\n
            Превышено количество хранимой еды.`);
        this._food = this._food.concat(...args);
        this._currentCapacity += arguments.length;
    },

    getFood() {
        return this._food.slice();
    },

    _checkFoodExist() {
        if(this._currentCapacity === 0)
            throw new Error(`Холодильник пуст.`);
    },

    checkFood() {
        this._checkFoodExist();
        console.log(`В холодильнике : ${this._food.join(', ')}.`);
    },

    getCurrentCapacity() {
        return this._currentCapacity;
    },

    filterFood(func) {
        this._checkFoodExist();
        return this._food.filter(func);
    },

    removeFood(item) {
        this._checkFoodExist();
        if(!~this._food.indexOf(item))
            throw new Error (`${item} отсутствует в холодильнике.`);
        this._food.splice(this._food.indexOf(item), 1);
    },

    disable() {
        if(this._food.length)
            throw new Error (`Холодильник должен быть пуст.`);
        Machine.prototype.disable.apply(this, arguments);
    },

    __proto__ : Machine.prototype,
};

let coffeeMachine10000 = new CoffeeMachine(10000, 1000);

coffeeMachine10000.setOnReady(
    function() { console.log(
        `Ваш кофе приготовлен в объёме : '${coffeeMachine10000.getWaterAmount()} ml'.`
    );}
);

let fridge1000 = new Fridge(1000);

