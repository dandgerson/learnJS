'use strict';

class Notification {
    constructor({top=10, right=10, html='Hello', className='notification'}={}) {
        this.top = top;
        this.right = right;
        this.html = html;
        this.className = className;
    }
    getElem() {
        !this._elem && (this._elem = document.createElement('div'));
        this._render();
        return this._elem;
    }
    _render() {
        this._elem.innerHTML = `${this.html}`;
        this._elem.classList.add(this.className);
        let e = this._elem.style;
        e.position = 'absolute';
        e.top = this.top + 'px';
        e.right = this.right + 'px';
        this._blink();
    }
    _blink() {
        setTimeout(()=>this.startBlinking(), 5000);
    }
    _toggle() {
        this._elem.hidden && (this._elem.innerHTML = `${this.html} : ${++this._toggleCount}`);
        this._elem.hidden = !this._elem.hidden;
    }
    stopBlinking() {
        this._toggleCount = 0;
        clearInterval(this._interval);
        !this._elem.hidden && (this._elem.hidden = true);
    }
    startBlinking() {
        this._toggleCount = 0;
        this._interval = setInterval(()=>this._toggle(), 1000);
    }
}
