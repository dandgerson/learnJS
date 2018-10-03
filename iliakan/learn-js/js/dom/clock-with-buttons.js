'use strict';

class ClockWithButtons extends Clock {
    getElem() {
        this._elem = super.getElem();
        this._elem.append(this._renderButtons());
        return this._elem;
    }
    _renderButtons() {
        let buttonInterface = document.createElement('div');

        let startButton = document.createElement('input');
        startButton.type = 'button';
        startButton.value = 'start';

        let stopButton = startButton.cloneNode(true);
        stopButton.value = 'stop';
        buttonInterface.append(startButton, stopButton);

        buttonInterface.addEventListener('click', this.click.bind(this));

        return buttonInterface;
    }
    click(event) {
        event.target.value === 'start' && super.start() || event.target.value === 'stop' && super.stop();
    }
}
