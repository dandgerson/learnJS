'use strict';

class Toggler {
    constructor({elem, target}) {
        this.target = target;
        elem.addEventListener('click', this.click.bind(this));
    }
    click() {
        this.toggle();
    }
    toggle() {
        this.target.hidden = !this.target.hidden;
    }
}
