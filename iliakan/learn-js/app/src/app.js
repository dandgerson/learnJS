import User from './user';
import UserList from './userList';
import UserForm from './userForm';

export default class Application {
  constructor() {
    this._render();
  }
  _render() {
    this._renderUserList();
    this._load();
  }
  _load() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://test-api.javascript.ru/v1/dandgerson/users');
    xhr.send();

    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      this._makeUsers(data);
    }
    xhr.onloadend = () => {
      this._userList.clear();
      this._userList.showUsers(this.users);
    }
  }
  _makeUsers(data) {
    let index = 0;
      this.users = new Map();
      for (let userData of data) {
        this.users.set(++index, new User(userData));
      }
      console.log(this.users);
  }
  _renderUserList() {
    this._userList = new UserList();
    document.body.append(this._userList.getElem());

    this._userList.elem.addEventListener('click', this);
  }
  handleEvent(event) {
    this[`on${event.type[0].toUpperCase() + event.type.slice(1)}`]();
  }
  onClick() {
    if (event.target.hasAttribute('data-user-index')) {
      this.form && this.form.destroy();
      const user = this.users.get(+event.target.dataset.userIndex);
      this.form = new UserForm(user);
      document.body.append(this.form.getElem());

      this.form.elem.addEventListener('submit', this);
    }
  }
  onSubmit() {
    event.preventDefault();
    this.form.loadEnd = null;
    this.form.sendData(this.form.process());
    this.form.destroy();
    this._userList.clear();
    const interval = setInterval(()=>{
      if (this.form.loadEnd) {
        this._load();
        clearInterval(interval);
      }
    }
    , 100);
  }
}
