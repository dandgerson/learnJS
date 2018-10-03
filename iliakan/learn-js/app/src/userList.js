import emptyTemplate from './emptyUserList.pug';
import * as lib from './lib';

export default class UserList {
  getElem() {
    this.elem || this._render();
    return this.elem;
  }
  _render() {
    this.elem = lib.createElementFromHtml(emptyTemplate());
  }
  showUsers(users) {
    const template = `
      <ul>
        <% for (let user of users.entries()) { %>
          <% console.log(user) %>
          <li><a href="#" data-user-index="<%-user[0] %>"><%-user[1].fullName %></a></li>
          <% } %>
      </ul>`;
    console.log(users.entries());
    this.clear();
    this.elem.insertAdjacentHTML('afterbegin', _.template(template)({ users: users }));
  }
  clear() {
    this.elem.innerHTML = '';
  }
}