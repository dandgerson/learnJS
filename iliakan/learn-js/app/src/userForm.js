'use strict';
import * as lib from './lib';

export default class UserForm {
  constructor(user) {
    this.user = user;
  }
  getElem() {
    this.elem || this.render();
    return this.elem;
  }
  render() {
    const template = `
      <form autocomplete="off">
        <div>fullName: <input type="text" name="fullName" value="<%=user.fullName %>" required></div>
        <div>email: <input type="email" name"email" value="<%=user.email %>" required></div>
        <div>_id: <%=user._id %></div>
        <% for (let prop in user) { 
          if (prop === 'fullName' || prop === 'email' || prop === '_id') continue; %>
          <div><%=prop %>: <input type="text" name="<%=prop %>" value="<%=user[prop] %>"></div>
        <% } %>
        <div><input type="submit" value="patch user"></div>
      </form>`;
    this.elem = lib.createElementFromHtml(_.template(template)({ user: this.user }));
  }
  process() {
    const data = {};
    for (let element of this.elem.elements) {
      if (!element.name || element.name === '_id') continue;
      data[element.name] = element.value;
    }
    return data;
  }
  destroy() {
    this.elem && this.elem.remove();
    this.elem = null;
  }
  sendData(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `http://test-api.javascript.ru/v1/dandgerson/users/${this.user._id}`);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));
    this.loadEnd = false
    xhr.onload = () => {
      console.log(xhr.responseText);
    };
    xhr.onloadend = () => {
      this.loadEnd = true;
    };
  }
}