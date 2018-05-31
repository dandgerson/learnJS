class BubbleSort {
    constructor({template, data}) {
        this.template = template({data: data});
    }

    getElem() {
        if(!this._elem) this._render();
        return this._elem;
    }

    _render() {
        this._elem = document.createElement('div');
        this._elem.insertAdjacentHTML('afterbegin', this.template);
        let self = this;
        this._elem.classList.add('container');
        this._items = [...self._elem.children];
    }

    sort() {
        this._time = Date.now();
        this._loops = this._swaps = 0;
        let self = this;
        let items = [...self._items];
        let swap = true;

        for (let i = 0; i < items.length && swap === true; i++) {
            swap = false;

            for (let j = 0; j < (items.length - (i + 1)); j++) {
                if ( +items[j].dataset.id > +items[j+1].dataset.id) {
                    let temp = items[j + 1];
                    items[j + 1] = items[j];
                    items[j] = temp;
                    swap = true;
                }
                this._swaps++;
            }
            this._loops++;
        }
        this._time = Date.now() - this._time;
        this._elem.append(...items);
    }

    reset() {
        this._elem.append(...this._items);
    }

    hardReset() {
        this._elem.remove();
        this._elem = null;
    }

    getStatistics() {
        return {
            loops: this._loops,
            swaps: this._swaps,
            time: this._time
        };
    }
}

class InsertSort extends BubbleSort {
    sort() {
        this._time = Date.now();
        this._loops = this._swaps = 0;
        let self = this;
        let items = [...self._items];
        for (let i = 1; i < items.length; i++) {
            for (let j = i; j > 0 ; j--) {
                if (+items[j - 1].dataset.id > +items[j].dataset.id) {
                    let temp = items[j - 1];
                    items[j - 1] = items[j];
                    items[j] = temp;
                } else break;
                // debugger;
                this._swaps++;
            }
            this._loops++;
        }
        this._time = Date.now() - this._time;
        this._elem.append(...items);
    }
}