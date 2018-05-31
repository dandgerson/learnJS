function Machine(power) {
    this._power = power;
    this._enabled = false;

    this.getPower = function () {
        return this._power;
    };

    this.enable = function () {
        if(this._enabled)
            throw new Error(`Устройство уже включено.`);
        this._enabled = true;
    };

    this.disable = function () {
        if(!this._enabled)
            throw new Error(`Устройство уже выключено.`);
        this._enabled = false;
    };

    this.getState = function () {
        return this._enabled;
    };
}

function CoffeeMachine(power, capacity) {

    Machine.apply(this, arguments);


    this._checkSafety = function () {
        if(this._enabled)
            throw new Error('Кофеварка должна быть в выключенном состоянии!');
    };

    this._checkState = function () {
        if(!this._enabled)
            throw new Error('Перед использованием кофеварку необходимо включить.');
    };

    

    this.getCapacity = function () {
        return capacity;
    };

    let waterAmount = 0;

    this.getWaterAmount = function () {
        return waterAmount;
    };

    this.setWaterAmount = function (amount) {
        this._checkSafety();
        if(amount < 0)
            throw new Error('Объём воды можеть быть только положительным.');
        if(amount > capacity)
            throw new Error('Объём воды не должен превышать ёмкость кофеварки.');

        waterAmount = amount;
    };

    this.addWater = function (amount) {
        this.setWaterAmount(waterAmount + amount);
    };

    let WATER_HEAT_CAPACITY = 4200;

    function getBoilTime() {
        return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }

    function onReady() {
        console.log( 'Кофе готово!' );
    }

    let timerId = null;

    this._checkWaterAmountMin = function () {
        if(waterAmount < 100) {
            this.disable();
            throw new Error(`Кофеварка не может быть запущена.\n
            Объём воды меньше минимально допустимого!\n
            Минимально допустимый объём воды : '100 ml'.\n
            Сработало автоматическое выключение!`);
        }
    };

    this.run = function() {
        this._checkState();
        this._checkWaterAmountMin();
        timerId = setTimeout(() => {
            timerId = null;
            onReady();
        }, getBoilTime());
    };

    this.stop = function () {
        if(!this.isRunning())
            throw new Error(`Кофеварка не запущена.`);
        clearTimeout(timerId);
        timerId = null;
    };

    this.isRunning = function () {
        return timerId !== null;
    };

    this.setOnReady = function (func) {
        onReady = func;
    };

    this._parentEnable = this.enable;
    this.enable = function () {
        this._parentEnable.call(this);
        this.run();
    };

    this._parentDisable = this.disable;
    this.disable = function () {
        if(this.isRunning())
            this.stop();
        this._parentDisable.call(this);
    };
}

let coffeeMachine10000 = new CoffeeMachine(10000, 1000);

coffeeMachine10000.setOnReady(
    () => console.log(
        `Ваш кофе приготовлен в объёме : '${coffeeMachine10000.getWaterAmount()} ml'.`
    )
);

function Fridge(power) {

    Machine.apply(this, arguments);

    this._FRIDGE_CAPACITY = this._power / 100;
    this._currentCapacity = 0;

    this._food = [];

    this.addFood = function (...args) {
        if(!this._enabled)
            throw new Error(`Холодильник выключен.`)
        
        if(this._currentCapacity + arguments.length > this._FRIDGE_CAPACITY)
            throw new Error (`Холодильник рассчитан на ${this._FRIDGE_CAPACITY} продуктов.\n
            Превышено количество хранимой еды.`);
        this._food = this._food.concat(...args);
        this._currentCapacity += arguments.length;
    };

    this.getFood = function () {
        return this._food.slice();
    };

    this._checkFoodExist = function() {
        if(this._currentCapacity === 0)
            throw new Error(`Холодильник пуст.`);
    };

    this.checkFood = function () {
        this._checkFoodExist();
        console.log(`В холодильнике : ${this._food.join(', ')}.`);
    };

    this.getCurrentCapacity = function() {
        return this._currentCapacity;
    };

    this.filterFood = function(func) {
        this._checkFoodExist();
        return this._food.filter(func);
    };

    this.removeFood = function(item) {
        this._checkFoodExist();
        if(!~this._food.indexOf(item))
            throw new Error (`${item} отсутствует в холодильнике.`);
        this._food.splice(this._food.indexOf(item), 1);
    };

    this._parentDisable = this.disable;
    this.disable = function() {
        if(this._food.length)
            throw new Error (`Холодильник должен быть пуст.`);
        this._parentDisable.call(this);
    };

}

let fridge1000 = new Fridge(1000);