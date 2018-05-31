function Machine(power) {
    
    this._power = power;
    this._enabled = false;
}

Machine.prototype.getPower = function() {
    return this._power;
};

Machine.prototype.enable = function () {
    if(this._enabled)
        throw new Error(`Устройство уже включено.`);
    this._enabled = true;
};

Machine.prototype.disable = function () {
    if(!this._enabled)
        throw new Error(`Устройство уже выключено.`);
    this._enabled = false;
};

Machine.prototype.getState = function () {
    return this._enabled;
};

function CoffeeMachine(power, capacity) {
    Machine.apply(this, arguments);
    this._capacity = capacity;
    this._waterAmount = 0;
    this._timerId = null;
    
}

CoffeeMachine.prototype.__proto__ = Machine.prototype;

CoffeeMachine.prototype.WATER_HEAT_CAPACITY = 4200;

CoffeeMachine.prototype._checkSafety = function () {
    if(this._enabled)
        throw new Error('Кофеварка должна быть в выключенном состоянии!');
};

CoffeeMachine.prototype._checkState = function () {
    if(!this._enabled)
        throw new Error('Перед использованием кофеварку необходимо включить.');
};

CoffeeMachine.prototype.getCapacity = function () {
    return this._capacity;
};

CoffeeMachine.prototype.getWaterAmount = function () {
    return this._waterAmount;
};

CoffeeMachine.prototype.setWaterAmount = function (amount) {
    this._checkSafety();
    if(amount < 0)
        throw new Error('Объём воды можеть быть только положительным.');
    if(amount > this._capacity)
        throw new Error('Объём воды не должен превышать ёмкость кофеварки.');

    this._waterAmount = amount;
};

CoffeeMachine.prototype.addWater = function (amount) {
    this.setWaterAmount(this._waterAmount + amount);
};

CoffeeMachine.prototype._getBoilTime = function() {
    return this._waterAmount * this.WATER_HEAT_CAPACITY * 80 / this._power;
};

CoffeeMachine.prototype._onReady = function() {
    console.log( 'Кофе готово!' );
};

CoffeeMachine.prototype._checkWaterAmountMin = function () {
    if(this._waterAmount < 100) {
        this.disable();
        throw new Error(`Кофеварка не может быть запущена.\n
        Объём воды меньше минимально допустимого!\n
        Минимально допустимый объём воды : '100 ml'.\n
        Сработало автоматическое выключение!`);
    }
};

CoffeeMachine.prototype.run = function() {
    this._checkState();
    this._checkWaterAmountMin();
    let self = this;
    this._timerId = setTimeout( function() {
        self._timerId = null;
        self._onReady();
    }, this._getBoilTime());
};

CoffeeMachine.prototype.stop = function () {
    if(!this.isRunning())
        throw new Error(`Кофеварка не запущена.`);
    clearTimeout(this._timerId);
    this._timerId = null;
};

CoffeeMachine.prototype.isRunning = function () {
    return this._timerId !== null;
};

CoffeeMachine.prototype.setOnReady = function (func) {
    this._onReady = func;
};

CoffeeMachine.prototype._parentEnable = CoffeeMachine.prototype.enable;
CoffeeMachine.prototype.enable = function () {
    this._parentEnable.call(this);
    this.run();
};

CoffeeMachine.prototype._parentDisable = CoffeeMachine.prototype.disable;
CoffeeMachine.prototype.disable = function () {
    if(this.isRunning())
        this.stop();
    this._parentDisable.call(this);
};

function Fridge(power) {

    Machine.apply(this, arguments);

    this._FRIDGE_CAPACITY = this._power / 100;
    this._currentCapacity = 0;

    this._food = [];

}

Fridge.prototype.__proto__ = Machine.prototype;

Fridge.prototype.addFood = function (...args) {
    if(!this._enabled)
        throw new Error(`Холодильник выключен.`);
    
    if(this._currentCapacity + arguments.length > this._FRIDGE_CAPACITY)
        throw new Error (`Холодильник рассчитан на ${this._FRIDGE_CAPACITY} продуктов.\n
        Превышено количество хранимой еды.`);
    this._food = this._food.concat(...args);
    this._currentCapacity += arguments.length;
};

Fridge.prototype.getFood = function () {
    return this._food.slice();
};

Fridge.prototype._checkFoodExist = function() {
    if(this._currentCapacity === 0)
        throw new Error(`Холодильник пуст.`);
};

Fridge.prototype.checkFood = function () {
    this._checkFoodExist();
    console.log(`В холодильнике : ${this._food.join(', ')}.`);
};

Fridge.prototype.getCurrentCapacity = function() {
    return this._currentCapacity;
};

Fridge.prototype.filterFood = function(func) {
    this._checkFoodExist();
    return this._food.filter(func);
};

Fridge.prototype.removeFood = function(item) {
    this._checkFoodExist();
    if(!~this._food.indexOf(item))
        throw new Error (`${item} отсутствует в холодильнике.`);
    this._food.splice(this._food.indexOf(item), 1);
};

Fridge.prototype._parentDisable = Fridge.prototype.disable;
Fridge.prototype.disable = function() {
    if(this._food.length)
        throw new Error (`Холодильник должен быть пуст.`);
    this._parentDisable.call(this);
};