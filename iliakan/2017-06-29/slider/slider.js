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