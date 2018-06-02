/* eslint-disable no-console */
'use strict';

class Application {
    constructor() {
        this.userList = new UserList();
        this.render();
    }

    render() {
        document.body.append(this.userList.getElem());
        this.load();

        this.userList.getElem().addEventListener('user-select', this.onUserSelect.bind(this));
    }

    onUserSelect(event) {
        let user = this.users.find(user => user._id === event.detail);
        // console.log(user);
        if (this.userForm) {
            this.userForm.destroy();
        }
        this.userForm = new UserForm(user);
        // console.log(this.userForm);
        document.body.append(this.userForm.getElem());
    }

    load() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://test-api.javascript.ru/v1/dandgerson/users');
        xhr.onload = () => {
            if (xhr.status !== 200)
                console.log('Error: ' + xhr.responseText);
            console.log('Ok!');

            this.users = JSON.parse(xhr.responseText);
            this.userList.showUsers(this.users);
        };
        xhr.send();

        xhr.onerror = () => {
            alert('Sorry error! Try again later');
        };
    }


}