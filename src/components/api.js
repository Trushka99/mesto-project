export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }
  // ПРОВЕРКА ОТВЕТА
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  // ИЗНАЧАЛЬНЫЕ КАРТЫ
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  // ПРОФИЛЬ С API
  getInitialProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  // РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  editProfile(profileName, profileJob) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: profileName.value,
        about: profileJob.value,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  };
  // РЕДАКТИРОВАТЬ АВАТАРКУ
  editavatar(input) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: input.value,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  // ДОБАВИТЬ КАРТОЧКУ
  addCard (newname, newlink) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newname.value,
        link: newlink.value,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  };
  // УДАЛИТЬ КАРТОЧКУ
  deleteCard  (cardId)  {
    return fetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._getResponseData(res);
    });
  };
  // ЛАЙКНУТЬ КАРТОЧКУ
 likeCard (cardId)  {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => {
      return this._getResponseData(res);
    });
  };
  // УДАЛИТЬ КАРТОЧКУ
  disLikeCard (cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._getResponseData(res);
    });
  };
}

