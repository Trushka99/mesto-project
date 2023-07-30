const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-26",
  headers: {
    authorization: "6bb49ea4-9d7a-4a97-8f53-ee02190921e9",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function renderLoading(isLoading, button, text, text2) {
  if (isLoading) {
    button.textContent = text;
  } else {
    button.textContent = text2;
  }
}

export const getInitialProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

export const editProfile = (profileName, profileJob) => {
  console.log(profileName.value);
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName.value,
      about: profileJob.value,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
};

export function editavatar(input) {
  console.log(input);
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,

    body: JSON.stringify({
      avatar: input.value,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};
export const addCard = (newname, newlink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newname.value,
      link: newlink.value,
    }),
  }).then((res) => {
    return getResponseData(res);
  });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  }).then((res) => {
    return getResponseData(res);
  });
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "PUT",
  }).then((res) => {
    return getResponseData(res);
  });
};

export const disLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  }).then((res) => {
    return getResponseData(res);
  });
};

// class Api {
//   constructor(url, headers) {
//     this._url = url;
//     this._headers = headers;
//   }
//   // ПРОВЕРКА ОТВЕТА
//   _getResponseData(res) {
//     if (!res.ok) {
//       return Promise.reject(`Ошибка: ${res.status}`);
//     }
//     return res.json();
//   }
//   // ИЗНАЧАЛЬНЫЕ КАРТЫ
//   getInitialCards() {
//     return fetch(`${this._url}cards`, {
//       headers: this._headers,
//     }).then((res) => {
//       return this._getResponseData(res);
//     });
//   }
//   // ФУНКЦИЯ ЗАГРУЗКИ
//   renderLoading(isLoading, button, text, text2) {
//     if (isLoading) {
//       thisbutton.textContent = text;
//     } else {
//       button.textContent = text2;
//     }
//   }
//   // ПРОФИЛЬ С API
//   getInitialProfile() {
//     return fetch(`${this._url}/users/me`, {
//       headers: this._headers,
//     }).then((res) => {
//       return this._getResponseData(res);
//     });
//   }
//   // РЕДАКТИРОВАНИЕ ПРОФИЛЯ
//   editProfile(profileName, profileJob) {
//     return fetch(`${this._url}/users/me`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify({
//         name: profileName.value,
//         about: profileJob.value,
//       }),
//     }).then((res) => {
//       return this._getResponseData(res);
//     });
//   };
//   // РЕДАКТИРОВАТЬ АВАТАРКУ
//   editavatar(input) {
//     return fetch(`${this._url}/users/me/avatar`, {
//       method: "PATCH",
//       headers: this._headers,

//       body: JSON.stringify({
//         avatar: input.value,
//       }),
//     }).then((res) => {
//       return this._getResponseData(res);
//     });
//   }
//   // ДОБАВИТЬ КАРТОЧКУ
//   addCard (newname, newlink) {
//     return fetch(`${this._url}/cards`, {
//       method: "POST",
//       headers: this._headers,
//       body: JSON.stringify({
//         name: newname.value,
//         link: newlink.value,
//       }),
//     }).then((res) => {
//       return this._getResponseData(res);
//     });
//   };
//   // УДАЛИТЬ КАРТОЧКУ
//   deleteCard  (cardId)  {
//     return fetch(`${this._url}/cards/${cardId}`, {
//       headers: this._headers,
//       method: "DELETE",
//     }).then((res) => {
//       return this._getResponseData(res);
//     });
//   };
//   // ЛАЙКНУТЬ КАРТОЧКУ
//  likeCard (cardId)  {
//     return fetch(`${this._url}/cards/likes/${cardId}`, {
//       headers: this._headers,
//       method: "PUT",
//     }).then((res) => {
//       return this._getResponseData(res);
//     });
//   };
//   // УДАЛИТЬ КАРТОЧКУ
//   disLikeCard (cardId) {
//     return fetch(`${this._url}/cards/likes/${cardId}`, {
//       headers: this._headers,
//       method: "DELETE",
//     }).then((res) => {
//       return this._getResponseData(res);
//     });
//   };
// }
// const api = new Api({
//   baseUrl: "https://nomoreparties.co/v1/plus-cohort-26",
//   headers: {
//     authorization: "6bb49ea4-9d7a-4a97-8f53-ee02190921e9",
//     "Content-Type": "application/json",
//   },
// });
