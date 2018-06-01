class UserForm {
    constructor(user) {
        this.user = user;
    }

    getElem() {
        if (!this.elem) {
            this.render();
        }
        return this.elem;
    }

    render() {
        let html = _.template('<div class="user-form">' +
            '<form>' +
            '   <p>Full Name: <input type="text" name="fullName"></p>' +
            '   <p>Email: <input type="email" name="email"></p>' +
            '   <p><input type="submit" value="Submit"></p>' +
            '</form>')();
        this.elem = createElementFromHTML(html);

        this.form = this.elem.querySelector('form');
        for (let prop in this.user) {
            if (this.form[prop]) {
                this.form[prop].value = this.user[prop];
            }
        }

        this.form.addEventListener('submit', this);
    }

    handleEvent(event) {
        this[
            'on' +
            event.type[0].toUpperCase() +
            event.type.slice(1)
        ](event);
    }

    destroy() {
        this.elem.remove();
        this.elem = null;
    }
}