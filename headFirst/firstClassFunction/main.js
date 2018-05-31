document.querySelector('body').style.backgroundColor = 'grey';

let passengers = [
    {name : 'Jane Doloop', paid : true, ticket : 'coach'},
    {name : 'Dr. Evel', paid : true, ticket : 'firstclass'},
    {name : 'Sue Property', paid : false, ticket : 'firstclass'},
    {name : 'John Funcall', paid : true, ticket : 'coach'},
    {name : 'Bob Marley', paid : true, ticket : 'secondclass'},
    {name : 'Phill Collins', paid : true, ticket : 'coach'},
    {name : 'Judas Priest', paid : true, ticket : 'secondclass'},
];

function checkNoFlyList(passenger) {
    for (let i = 0; i < passengers.length; i++) {
        if (passenger.name === 'Dr. Evel') {
            return true;
        }
    }
    return false;
}

function checkNoPaid(passenger) {
    for (let i = 0; i < passengers.length; i++) {
        if (!passenger.paid) {
            return true;
        }
    }
    return false;
}

function printPassengers(passenger) {
    console.log(`name: ${passenger.name}, paid status: ${passenger.paid}`);
    return false;
}

function processPassengers(passengers, func) {
    for (let i = 0; i < passengers.length; i++) {
        if (func(passengers[i])) {
            return false;
        }
    }
    return true;
}

function serveCustomer (passenger) {
    let getDrinkOrderFunction = createDrinkOrder(passenger);
    let getDinnerOrderFunction = createDinnerOrder(passenger);
    getDrinkOrderFunction();
    getDinnerOrderFunction();
    getDrinkOrderFunction();
    console.log(`Включаем кино`);
    getDrinkOrderFunction();
    console.log(`Забираем мусор`);
}

function createDrinkOrder(passenger) {
    let orderFunction;
    switch (passenger.ticket) {
    case 'firstclass':
        orderFunction = function() {
            console.log(`Would you like a coctail or chocolate?`);
        };
        break;
    case 'secondclass':
        orderFunction = function() {
            console.log(`Would you like a cola, chocolate or water?`);
        };
        break;
    default:
        orderFunction = function() {
            console.log(`Your choise is cola or water.`);
        };
        break;
    }
    return orderFunction;
}

function createDinnerOrder(passenger) {
    let orderFunction;
    switch (passenger.ticket) {
    case 'firstclass':
        orderFunction = function() {
            console.log(`Would you like a chicken or paste?`);
        };
        break;
    case 'secondclass':
        orderFunction = function() {
            console.log(`Would you like a nuts or chips?`);
        };
        break;
    default:
        orderFunction = function() {
            console.log(`Your choise is snacks or cheese plate.`);
        };
        break;
    }
    return orderFunction;
}

// web cola

let products = [
    {name : 'Grapefruit', calories : 170, color : 'red', sold : 8200},
    {name : 'Orange', calories : 160, color : 'orange', sold : 12101},
    {name : 'Cola', calories : 210, color : 'caramel', sold : 25412},
    {name : 'Diet Cola', calories : 0, color : 'caramel', sold : 43922},
    {name : 'Lemon', calories : 200, color : 'clear', sold : 14983},
    {name : 'Raspberry', calories : 180, color : 'pink', sold : 9427},
    {name : 'Root Beer', calories : 200, color : 'caramel', sold : 9909},
    {name : 'Water', calories : 0, color : 'clear', sold : 62123},
];

function compareSold(colaA, colaB) {
    return colaA.sold - colaB.sold;
}

function compareName(colaA, colaB) {
    return colaA.name > colaB.name ? 1 : -1;
}