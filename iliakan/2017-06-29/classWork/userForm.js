'use strict';



class UserForm {
    constructor({user, template}) {
        this.user = user;
        this.template = template;
    }

    getElem() {
        if (!this.elem) {
            this.render();
        }
        return this.elem;
    }

    render() {
        let user = this.user;
        let html = _.template(this.template)({ user });
        this.elem = createElementFromHTML(html);
    }

    destroy() {
        this.elem.remove();
        this.elem = null;
    }
}

