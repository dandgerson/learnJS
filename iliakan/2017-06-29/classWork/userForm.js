/* eslint-disable no-console */
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
            '   <p>Full Name: <input type="text" name="fullName" required></p>' +
            '   <p>Email: <input type="email" name="email" required></p>' +
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

    onSubmit(event) {
        for (let prop in this.user) {
            if (this.form[prop]) {
                this.user[prop] = this.form[prop].value;
            }
        }

        this.upload();

        // TODO: SAVE ON SERVER
        // save form.value in obj
        // make xhr.open('PATCH'...)
        // xhr.send(JSON.stringify(obj))
        // TODO: TRIGGER EVENT
        // (app will update user in userList and close

        // console.log(this.user);
        event.preventDefault();
    }

    upload() {
        let xhr = new XMLHttpRequest();
        xhr.open('PATCH', `http://test-api.javascript.ru/v1/dandgerson/users/${this.user._id}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            fullName: this.form['fullName'].value,
            email: this.form['email'].value
        }));

        xhr.onload = () => {
            if (xhr.status !== 200)
                console.log('Error: ' + xhr.responseText);
            console.log('Ok!');
            this.patchUser = true;
        };

        xhr.onerror = () => {
            alert('Sorry error! Try again later');
        };
    }


    destroy() {
        this.elem.remove();
        this.elem = null;
    }
}