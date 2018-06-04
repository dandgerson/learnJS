class Slider {
    constructor({container}) {
        this.container = container;
        this.renderSlider();
    }


    static getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset,
            width: box.width
        };
    }

    renderSlider() {
        this.slider = document.createElement('div');
        this.slider.setAttribute('data-id', 'slider');

        this.renderThumb();
        let thumb = this.thumb;

        this.slider.append(thumb);
        let slider = this.slider;
        this.container.append(slider);

    }

    renderThumb() {
        this.thumb = document.createElement('div');
        this.thumb.setAttribute('data-id', 'thumb');

        this.thumb.addEventListener('dragstart', () => {return false;});
        this.thumb.addEventListener('mousedown', this.onMouseDown.bind(this));
    }

    onMouseDown(event) {
        let thumb = event.target;
        this.thumbCoords = Slider.getCoords(thumb);

        this._shiftX = event.pageX - this.thumbCoords.left;

        thumb.style.position = 'absolute';
        thumb.style.top = this.thumbCoords.top + 'px';
        thumb.style.zIndex = '1000';

        document.body.append(thumb);

        this._moveAtX();

        document.onmousemove = () => this.onMouseMove();
        document.onmouseup = () => this.onMouseUp();
    }

    onMouseMove(event) {
        this._moveAtX();
    }

    onMouseUp(event) {
        document.onmousemove = null;
        document.onmouseup = null;
    }

    _moveAtX() {
        let sliderCoords = this.slider.getBoundingClientRect();

        let left = event.pageX - this._shiftX;

        if (left < sliderCoords.left)
            left = sliderCoords.left;

        if (left > sliderCoords.right - this.thumbCoords.width)
            left = sliderCoords.right - this.thumbCoords.width;

        this.thumb.style.left = left + 'px';
    }


}



let thumb = document.querySelector('.thumb');
thumb.addEventListener('mousedown', onMouseDown);

function onMouseDown(event) {
    let thumb = event.target;
    let thumbCoords = getCoords(thumb);

    let shiftX = event.pageX - thumbCoords.left;
    let shiftY = event.pageY - thumbCoords.top;

    thumb.style.position = 'absolute';
    thumb.style.top = thumbCoords.top + 'px';
    document.body.append(thumb);

    thumb.style.zIndex = 1000; // над другими элементами

    moveAtX(event);

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', onMouseUp);

    function moveAtX(event) {
        let slider = document.querySelector('#slider');
        let sliderCoords = slider.getBoundingClientRect();

        let left = event.pageX - shiftX;

        if (left < sliderCoords.left)
            left = sliderCoords.left;

        if (left > sliderCoords.right)
            left = sliderCoords.right;

        thumb.style.left = left + 'px';
    }

    function onMouseMove(event) {
        moveAtX(event);
    }

    function onMouseUp(event) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

}

thumb.addEventListener('dragstart', event => {
    return false;
});

function getCoords(elem) { // кроме IE8-
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}