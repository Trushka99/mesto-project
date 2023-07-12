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

export const initialProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return getResponseData(res);
  });
};

export const editProfile = (profileName, profileJob) => {
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
  })
  .then((res) => {
    return getResponseData(res);
  });
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "PUT",
  })
  .then((res) => {
    return getResponseData(res);
  });
};

export const disLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  })
  .then((res) => {
    return getResponseData(res);
  });
};
