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
        console.log(user);
        if (this.userForm) {
            this.userForm.destroy();
        }
        this.userForm = new UserForm(user);
        document.body.append(this.userForm.getElem());
    }

    load() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://test-api.javascript.ru/v1/dandgerson/users');
        xhr.onload = () => {
            this.users = JSON.parse(xhr.responseText);
            this.userList.showUsers(this.users);
        };
        xhr.send();
    }
}