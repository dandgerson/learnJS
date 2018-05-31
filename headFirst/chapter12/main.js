document.body.style.backgroundColor = 'grey';

function Coffee(roast, ounces) {
    this.roast = roast;
    this.ounces = ounces;
    this.getSize = () => {
        if (this.ounces < 9) return 'small';
        if (this.ounces < 13) return 'medium';
        return 'large';
    };
    this.toString = () => `You've ordered ${this.getSize()} ${this.roast}`;

}

// let houseBlend = new Coffee('House Blend', 8);
// console.log(houseBlend.toString());

// let darkRoast = new Coffee('Dark Roast', 16);
// console.log(darkRoast.toString());

function MakeCar(carProp) {
    this.make = carProp.make || 'Chevy';
    this.model = carProp.model  || 'Bel Air';
    this.year = carProp.year || 1957;
    this.color = carProp.color || 'red';
    this.passengers = carProp.passengers || 2;
    this.convertible = carProp.convertible || false;
    this.mileage = carProp.mileage || 0;
    this.started = carProp.started || false;

    this.start = () => this.started = true;
    this.stop = () => this.started = false;
    this.drive = () => {
        if (this.started) {
            console.log(`${this.make} ${this.model} goes zoom zoom!`);
        } else {
            console.log(`Start the engine first.`);
        }
    };
}

let chevy = new MakeCar({
    make : 'GM'
});