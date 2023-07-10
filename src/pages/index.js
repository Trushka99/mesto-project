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
  avatarForm
} from "../components/utils.js";
import { getInitialCards, initialProfile } from "../components/api.js";
initialProfile(profileName, profileJob, avatarPic)

avatarPic.onmouseover = function () {
  overlayPic.classList.add("profile__avatar_hover_active");
};
avatarPic.onmouseout = function () {
  overlayPic.classList.remove("profile__avatar_hover_active");
};

import "./index.css";
// Открытие попапа для редактирования профиля и добавляения карточки
import {
  openPopupEdit,
  openPopupAdd,
  handleProfileFormSubmit,
  closePopupButton,
  popupOverlay,
  openPopup,
  editAvatar
} from "../components/modal.js";

function openPopupAvatar() {
  openPopup(document.querySelector(".popup_function_avatar"));
}

avatarPic.addEventListener("click", openPopupAvatar);
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

// Создание карточки
import { createCard, handleFormAdd } from "../components/card.js";
// Добавление карточки и реализация остальных функций на новых элементах

cardForm.addEventListener("submit", handleFormAdd);

avatarForm.addEventListener("submit", editAvatar);


import { enableValidation } from "../components/validate.js";
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


getInitialCards()
  .then((result) => {
    result.forEach(function (item) {
      const placeElement = createCard(item, item.likes.length, item.owner._id);
      placesContainer.append(placeElement);
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });





