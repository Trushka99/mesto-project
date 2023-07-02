import {
  initialcards,
  profileEditButton,
  profileAddButton,
  profileForm,
  cardForm,
  placesContainer,
  closeButtons,
  popups
} from "../components/utils.js";
import "./index.css";
// Открытие попапа для редактирования профиля и добавляения карточки
import {
  openPopupEdit,
  openPopupAdd,
  handleProfileFormSubmit,
  closePopupButton,
  popupOverlay
} from "../components/modal.js";

profileEditButton.addEventListener("click", openPopupEdit);
profileAddButton.addEventListener("click", openPopupAdd);
// Закрытие попапов

closeButtons.forEach((button) => {
  button.addEventListener("click", () => closePopupButton(button));
});

popups.forEach((popup) => {
  popup.addEventListener('click', () => popupOverlay(event,popup))
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
// Вывод массива
initialcards.forEach(function (item) {
  const placeElement = createCard(item);
  placesContainer.append(placeElement);
});
// Создание карточки
import { createCard, handleFormAdd } from "../components/card.js";
// Добавление карточки и реализация остальных функций на новых элементах

cardForm.addEventListener("submit", handleFormAdd);

import {
  enableValidation
} from "../components/validate.js";
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation( {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error'
}); 