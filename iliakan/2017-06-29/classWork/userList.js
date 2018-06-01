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

        let html = _.template('<div class="user-list loading>"></div>')();
        this.elem = createElementFromHTML(html);


        // let html = _.template('<div class="user-list>">\n' +
        //     '        <ul>\n' +
        //     '            <% for(let user of users) { %>\n' +
        //     '                <li><a href="#" data-id="<%=user._di>"><%=user.fullName%></a></li>\n' +
        //     '            <% } %>\n' +
        //     '        </ul>\n' +
        //     '    </div>')();
    }


}