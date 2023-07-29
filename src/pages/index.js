import {
  profileEditButton,
  profileAddButton,
  profileForm,
  cardForm,
  placesContainer,
  closeButtons,
  popups,
  profileName,
  profileJob,
  avatarPic,
  overlayPic,
  avatarForm,
  profileEditName,
  profileEditJob,
  profileInfoPopup,
  popupSubmitEdit,
  avatarInput,
  popupSubmitAvatar,
  avatarPopup,
  newcardImage,
  newcardName,
  profileAddPopup,
  popupSubmitAdd,
} from "../components/utils.js";
import {
  getInitialProfile,
  editProfile,
  renderLoading,
  editavatar,
} from "../components/api.js";
import "./index.css";
import {
  closePopupButton,
  popupOverlay,
  openPopup,
  closePopup,
} from "../components/modal.js";
import {
  enableValidation,
  hideInputError,
  buttonStateDisabled,
} from "../components/validate.js";

function openPopupEdit() {
  openPopup(profileInfoPopup);
  profileEditName.value = profileName.textContent;
  profileEditJob.value = profileJob.textContent;
  const input = profileInfoPopup.querySelectorAll(".popup__input");
  input.forEach((input) => {
    hideInputError(profileForm, input);
  });
}
function openPopupAdd() {
  openPopup(profileAddPopup);
}

function handleProfileFormSubmit() {
  renderLoading(true, popupSubmitEdit, "Сохранение..", "Сохранить");
  editProfile(profileEditName, profileEditJob)
    .then(
      (profileName.textContent = profileEditName.value),
      (profileJob.textContent = profileEditJob.value),
      closePopup(profileInfoPopup)
    )
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupSubmitEdit, "Сохранение..", "Сохранить");
    });

  buttonStateDisabled(popupSubmitEdit, "popup__submit_inactive");
}

function editAvatar() {
  renderLoading(true, popupSubmitAvatar, "Сохранение..", "Сохранить");
  editavatar(avatarInput)
    .then((avatarPic.src = avatarInput.value), closePopup(avatarPopup))
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupSubmitAvatar, "Сохранение..", "Сохранить");
    });
}

export let clientID;

getInitialProfile()
  .then((data) => {
    profileName.textContent = data.name;
    profileJob.textContent = data.about;
    avatarPic.src = data.avatar;
    clientID = data._id;
  })
  .catch((err) => {
    console.log(err);
  });

overlayPic.onmouseover = function () {
  overlayPic.classList.add("profile__avatar_hover_active");
};
overlayPic.onmouseout = function () {
  overlayPic.classList.remove("profile__avatar_hover_active");
};

// Открытие попапа для редактирования профиля и добавляения карточки

function openPopupAvatar() {
  openPopup(avatarPopup);
}

overlayPic.addEventListener("click", openPopupAvatar);
profileEditButton.addEventListener("click", openPopupEdit);
profileAddButton.addEventListener("click", openPopupAdd);
// Закрытие попапов

closeButtons.forEach((button) => {
  button.addEventListener("click", () => closePopupButton(button));
});

popups.forEach((popup) => {
  popup.addEventListener("click", () => popupOverlay(event, popup));
});

profileForm.addEventListener("submit", handleProfileFormSubmit);


avatarForm.addEventListener("submit", editAvatar);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_error",
});


import Section from "../components/section.js";
import Card from "../components/card.js";
import { Api } from "../components/api.js";

const placeTemplate = document.querySelector("#place-template").content;

const api = new Api({
  url: "https://nomoreparties.co/v1/plus-cohort-26",
  headers: {
    authorization: "6bb49ea4-9d7a-4a97-8f53-ee02190921e9",
    "Content-Type": "application/json",
  },
});
// Создание карточки
function createCards(data) {
  const card = new Card(data, placeTemplate, clientID, {
    cardDelete: (card, cardId) => {
      api
        .deleteCard(cardId)
        .then(() => {
          card.remove(placesContainer);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    putLike: (cardId) => {
      api
        .likeCard(cardId)
        .then(() => {
          card.countLike();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dislike: (cardId) => {
      api
        .disLikeCard(cardId)
        .then(() => {
          card.countLike();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return card.generate()
}
// заполнение карточками с сервера 
api
  .getInitialCards()
  .then((res) => {
    const rendercards = new Section(
      {
        data: res,
        renderer: (item) => {
          rendercards.setItem(createCards(item)
          );
        },
      },
      placesContainer
    );
    rendercards.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

// функция добавления карточки
function handleFormAdd() {
  renderLoading(true, popupSubmitAdd, "Создание...", "Создать");
  api
    .addCard(newcardName, newcardImage)
    .then((data) => {
      placesContainer.prepend(createCards(data));
    })
    .then(closePopup(profileAddPopup))
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupSubmitAdd, "Создание...", "Создать");
      cardForm.reset();
      buttonStateDisabled(popupSubmitAdd, "popup__submit_inactive");
    });
}
cardForm.addEventListener("submit", handleFormAdd);
