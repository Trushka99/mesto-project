export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = nameSelector;
    this._about = aboutSelector;
    this._avatar = avatarSelector;
  }
  gettUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }
}
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
      this._name = nameSelector;
      this._about = aboutSelector;
      this._avatar = avatarSelector;
    }
    gettUserInfo({ name, about, avatar }) {
      this._name.textContent = name;
      this._about.textContent = about;
      this._avatar.src = avatar;
    }
  }
