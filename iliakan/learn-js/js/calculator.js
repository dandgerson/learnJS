class Calculator {
  constructor() {
    this.operands = this.result = null;
  }

  _getOperands() {
    this.operands = prompt('Inter two values via comma', '5, 10').split(',');
  }

  read() {
    this._getOperands();
    this._validate();
    this._convertOperands();
  }

  _validate() {
     for (let operand of this.operands) {
      if (isNaN(operand))
        throw new Error (`The values must be whole digits via comma. You inter: "${operand}" is not correct value!`);
     }
  }

  _convertOperands() {
    for (let i = 0; i < this.operands.length; i++) {
      this.operands[i] = Number(this.operands[i]);
    }
  }

  sum() {
    this.result = this.operands[0] + this.operands[1];
  }

  mul() {
    this.result = this.operands[0] * this.operands[1];
  }

  showResult() {
    console.log(this.result);
  }
}

let calc = new Calculator();