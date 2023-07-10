const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-26",
  headers: {
    authorization: "6bb49ea4-9d7a-4a97-8f53-ee02190921e9",
    "Content-Type": "application/json",
  },
};

import { popupSubmitEdit, popupSubmitAdd, popupSubmitAvatar } from "./utils";

export function renderLoading(isLoading, button, text, text2) {
  if (isLoading) {
    button.textContent = text;
  } else {
    button.textContent = text2;
  }
}

export const initialProfile = (name, subname, pic) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      name.textContent = data.name;
      subname.textContent = data.about;
      pic.src = data.avatar;
    })
    .catch((err) => {
      return Promise.reject(`Ошибка: ${err.status}`);
    });
};

export const editProfile = (profileName, profileJob) => {
  renderLoading(true, popupSubmitEdit, "Сохранение..", "Сохранить");
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName.value,
      about: profileJob.value,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return Promise.reject(`Ошибка: ${err.status}`);
    })
    .finally(() => {
      renderLoading(false, popupSubmitEdit, "Сохранение..", "Сохранить");
    });
};

export function editavatar(input) {
  renderLoading(true, popupSubmitAvatar, "Сохранение..", "Сохранить");
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "6bb49ea4-9d7a-4a97-8f53-ee02190921e9",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      avatar: input.value,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return Promise.reject(`Ошибка: ${err.status}`);
    })
    .finally(() => {
      renderLoading(false, popupSubmitAvatar, "Сохранение..", "Сохранить");
    });
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
export const addedCard = (newname, newlink) => {
  renderLoading(true, popupSubmitAdd, "Создание...", "Создать");
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newname.value,
      link: newlink.value,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return Promise.reject(`Ошибка: ${err.status}`);
    })
    .finally(() => {
      renderLoading(false, popupSubmitAdd, "Создание...", "Создать");
    });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((err) => {
      return Promise.reject(`Ошибка: ${err.status}`);
    });
};

export const cardLiked = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "PUT",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((err) => {
      return Promise.reject(`Ошибка: ${err.status}`);
    });
};

export const cardDisliked = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((err) => {
      return Promise.reject(`Ошибка: ${err.status}`);
    });
};
