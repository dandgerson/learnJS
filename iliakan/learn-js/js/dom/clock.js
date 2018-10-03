'use strict';

class Clock {
    getElem() {
        !this._elem && (this._elem = document.createElement('div'));
        this._render();
        return this._elem;
    }

    _render() {
        this._elem.innerHTML = `
        <span style="color:red;">HH</span>:<span style="color:green;">MM</span>:<span style="color:blue;">SS</span>`;
        this.start();
    }
    _tick() {
        let date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        let spans = this._elem.querySelectorAll('span');
        spans[0].innerHTML = h < 10 && (h = '0' + h) || h;
        spans[1].innerHTML = m < 10 && (m = '0' + m) || m;
        spans[2].innerHTML = s < 10 && (s = '0' + s) || s;
    }
    start() {
        if (!this._timerId) {
            this._tick();
            this._timerId = setInterval(()=>this._tick(), 1000);    
        }
        
    }
    stop() {
        if (this._timerId) {
            clearInterval(this._timerId);
            this._timerId = null;    
        }
        
    }
}
