window.onload = init;


function init() {
    let userNameButton = document.getElementById('userNameButton');
    userNameButton.onclick = handleUserNameButton;
    let userNameInput = document.getElementById('userNameInput');
    userNameInput.onkeypress = handleUserNameKeyPress;

    let fireButton = document.getElementById('fireButton');
    fireButton.onclick = handleFireButton;
    let guessInput = document.getElementById('guessInput');
    guessInput.onkeypress = handleKeyPress;
    model.generateShipLocations();
}

function handleKeyPress(e) {
    let fireButton = document.getElementById('fireButton');
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

function handleFireButton() {
    let guessInput = document.getElementById('guessInput');
    let guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = null;

}

function handleUserNameButton() {
    let userNameInput = document.getElementById('userNameInput');
    let user = {name : userNameInput.value};
    model.users.push(user);
    document.getElementById('userForm').setAttribute('class', 'hide');
    view.displayMessageWarning(`Hello, ${user.name}! \n You should sank all of my BattleShips!`);
    
}

function handleUserNameKeyPress(e) {
    let userNameButton = document.getElementById('userNameButton');
    if (e.keyCode === 13) {
        userNameButton.click();
        return false;
    }
}

let model = {

    users : [],
    
    boardSize : 7,
    numShips : 3,
    shipLength : 3,
    shipsSunk : 0,

    ships : [
        { locations : ['', '', ''], hits : ['', '', ''] },
        { locations : ['', '', ''], hits : ['', '', ''] },
        { locations : ['', '', ''], hits : ['', '', ''] }
    ],

    generateShipLocations() {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this._generateShip();
            } while (this._collision(locations));
            this.ships[i].locations = locations;
        }
    },

    _generateShip() {
        let direction = Math.floor(Math.random() * 2);
        let row, col;

        if (direction) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }

        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (direction) {
                newShipLocations.push(row + '' + (col + i));
            } else {
                newShipLocations.push((row + i) + '' + col);
            }
        }
        return newShipLocations;
    },

    _collision(locations) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = model.ships[i];
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },

    fire(guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (~index) {
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessageInfo('HIT!');
                if (this._isSunk(ship)) {
                    view.displayMessageInfo('You sank my BattleShip!');
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessageInfo('You missed.');
        return false;
    },

    _isSunk(ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    }
};

let view = {

    displayMessageInfo(msg) {
        let messageArea = document.getElementById('messageArea');
        messageArea.setAttribute('class', 'info');
        messageArea.innerHTML = msg;
    },

    displayMessageAlert(msg) {
        let messageArea = document.getElementById('messageArea');
        messageArea.setAttribute('class', 'alert');
        messageArea.innerHTML = msg;
    },

    displayMessageWarning(msg) {
        let messageArea = document.getElementById('messageArea');
        messageArea.setAttribute('class', 'warning');
        messageArea.innerHTML = msg;
    },

    displayMiss(location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    },

    displayHit(location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    }

};

let controller = {
    
    guesses : [],

    _parseGuess(guess) {
        let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        if (guess === null || guess.length !== 2) {
            view.displayMessageWarning('Oops! Please enter a letter and number on the board.');
        } else {
            let firstChar = guess[0].toUpperCase();
            let row = alphabet.indexOf(firstChar);
            let column = guess[1];

            if (isNaN(row) || isNaN(column)) {
                view.displayMessageWarning('Oops! That isn\'t on the board');
            } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
                view.displayMessageWarning('Oops! That\'s off the board!');
            } else if (~this.guesses.indexOf(row + column)) {
                view.displayMessageWarning('You already hit this place!');
            } else {
                return row + column;
            }
        }
        return null;
    },

    processGuess(guess) {
        let location = this._parseGuess(guess);
        if (location) {
            this.guesses.push(location);
            let hit = model.fire(location);
            if (hit && (model.shipsSunk === model.numShips)) {
                view.displayMessageWarning(`${model.users[0].name}, You sank all my BattleShips, in ${this.guesses.length} guesses.`);
            }
        }
    }
};




