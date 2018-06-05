class DragElem {
    constructor({ elemClassName, container }) {
        this.elemClassName = elemClassName;
        this.container = container;

        document.addEventListener('mousedown', this.onMouseDown.bind(this));
    }

    static getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset,
            width: box.width,
            height: box.height
        };
    }

    onMouseDown(event) {
        if (!event.target.classList.contains(this.elemClassName)) return;

        this.dragElem = event.target;

        this.dragElemCoords = DragElem.getCoords(this.dragElem);

        this._shiftX = event.pageX - this.dragElemCoords.left;
        this._shiftY = event.pageY - this.dragElemCoords.top;

        this.dragElem.style.position = 'absolute';
        this.dragElem.style.zIndex = '1000';

        this.container.append(this.dragElem);

        this._moveAt();

        this.dragElem.addEventListener('dragstart', event => event.preventDefault());
        document.onmousemove = event => this.onMouseMove();
        this.dragElem.onmouseup = event => this.onMouseUp();
    }

    _moveAt() {
        let boxCoord = this.dragElem.getBoundingClientRect();
        let left = event.pageX - this._shiftX;
        let top = event.pageY - this._shiftY;
        console.log(boxCoord);
        console.log('left: ' + left);
        console.log('top: ' + top);
        console.log('scrollTop: ' + document.documentElement.scrollTop);
        console.log('pageYOffset: ' + pageYOffset);

        if (left < 0) left = 0;
        if (left + this.dragElemCoords.width > document.documentElement.clientWidth)
            left = document.documentElement.clientWidth - this.dragElemCoords.width;
        if (top < pageYOffset) top = pageYOffset;
        if (top + this.dragElemCoords.height > pageYOffset + document.documentElement.clientHeight)
            top = pageYOffset + document.documentElement.clientHeight - this.dragElemCoords.height;
        this.dragElem.style.left = left + 'px';
        this.dragElem.style.top = top + 'px';
    }

    onMouseMove() {
        this._moveAt();
    }

    onMouseUp() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}