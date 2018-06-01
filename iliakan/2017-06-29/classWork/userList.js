'use strict';

class UserList {
    constructor() {

    }

    getElem() {
        if (!this.elem) {
            this.render();
        }
        return this.elem;
    }

    render() {
        let html = _.template('<div class="user-list"></div>')();
        this.elem = createElementFromHTML(html);
    }

    showUsers(users) {
        this.users = users;

        this.elem.innerHTML = _.template('<ul>\n' +
            '            <% for (let user of users) { %>\n' +
            '                <li><a href="#" data-id="<%=user._id %>"><%=user.fullName %></a></li>\n' +
            '            <% } %>\n' +
            '        </ul>')({ users });
    }


}