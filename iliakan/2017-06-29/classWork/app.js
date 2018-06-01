'use strict';

class Application {
    constructor() {
        this.userList = new UserList();
        this.render();
    }

    render() {
        document.body.append(this.userList.getElem());
        this.load();
    }

    load() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://test-api.javascript.ru/v1/dandgerson/users');
        xhr.onload = () => {
            this.users = JSON.parse(xhr.responseText);
        }
    }
}