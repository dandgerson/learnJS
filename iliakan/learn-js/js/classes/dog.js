'use strict';

class Animal {
    constructor({ name = `Animal` }) {
    this.name = name;

    this.paws = {
        rightForepaw: true,
        leftForepaw: true,
        rightHindpaw: true,
        leftHindpaw: true,
        length: 4,
    };
    this.tail = true;

    this.intestines = [];

    this.canEat = true;
    this.canPoop = true;

    this.wildness = true;
    } 

    eat(something = `something`) {
        if (!this.canEat) {
            console.log(`${this.name} can't eat for some reasons...`);
            console.log(`${this.name} feels like rumbling in his belly...`);
            return;
        }
        
        this.intestines.unshift(something);
        console.log(`${this.name} eats... "${something}"`);

        if (something.match('rotten'))
            setTimeout(() => this.puke(), 5000);
    }

    puke() {
        if (this.intestines.length === 0) {
            console.log(`${this.name} must to eat something semi-eatable to do this one...`);
            console.log(`${this.name}: Hic...`);
            return;    
        }
        
        let firstEatable = this.intestines.shift();
        let vommit = new Vommit(this.name, firstEatable);
        console.log(`${this.name} puke... with piece of semi-digested "${firstEatable}'s" vommit`);
        console.log(vommit);
        
        this.canEat = false;
        console.log(`${this.name} can't eat by 10s!`);
        
        setTimeout(() => {
            this.canEat = true;
            console.log(`${this.name} can eat again!`);
            }, 10000)
        
        return vommit;
    }

    poop() {
        if (!this.canPoop) {
            console.log(`${this.name} can't poop for some reasons...`);
            console.log(`${this.name}: puuuuuk...`);
            return;
        }
        if (this.intestines.length === 0) {
            console.log(`${this.name} must to eat something eatable to do this one...`);
            console.log(`${this.name}: puuuuuk...`);
            return;    
        }
        let lastEatable = this.intestines.pop();
        let poop = new Poop(this.name, lastEatable);
        console.log(`${this.name} poops with piece of shit of digested "${lastEatable}"`);
        console.log(poop);
        return poop;
    }
}

class Poop {
    constructor(owner, lastEatable) {
        this.owner = owner;
        this.lastEatable = lastEatable;
        this.poop = {
            name: `piece of shit of digested "${this.lastEatable}"`,
            owner: this.owner,
        }
    }

    smells() {
        console.log(`it smells like a piece of ${this.lastEatable}'s shit`)
    }
    
}

class Vommit {
    constructor(owner, firstEatable) {
        this.owner = owner;
        this.firstEatable = firstEatable;
        this.spew = {
            name: `piece of semidigested "${this.firstEatable}'s" vommit`,
            owner: this.owner,
        }
    }

    smells() {
        console.log(`it smells like a piece of ${this.firstEatable}'s vommit`)
    }
}


class Dog extends Animal {
    constructor({ 
        name = 'Dog', 
        weight = 30,
        color = 'black',
        age = 5,
        gender = 'male',
        ownerName = null,
    }) {
        super({ name: name });
        this.weight = weight;
        this.color = color;
        this.age = age;
        this.gender = gender;
        this.ownerName = ownerName;

        this.ownerName ? this.wildness = false : this.wildness = true;
    }

    bark() {
        console.log(`${this.name}: Wowff!!! Wowff!!! Wowff!!!`);
    }

    poop() {
        this.bark();
        super.poop();
    }

    puke() {
        this.bark();
        super.puke();
    }
}