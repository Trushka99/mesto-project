import {
  newcardImage,
  newcardName,
  profileAddPopup,
  profieImagePopup,
  profileZoomedImage,
  profileZoomedImageCaption,
  placesContainer,
  placeTemplate,
  cardForm
} from "./utils";

import { openPopup, closePopup } from "./modal";
function createCard(element) {
  const cardElement = placeTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  cardImage.src = element.link;
  cardImage.alt = element.name;
  const cardtText = cardElement.querySelector(".elements__description");
  cardtText.textContent = element.name;
  // Кнопка лайка
  const cardLikeButton = cardElement.querySelector(".elements__heart");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("elements__heart_status_active");
  });
  // Удаление карточки
  const cardDeleteButton = cardElement.querySelector(".elements__delete");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  // Попап с увеличенным изображением
  cardImage.addEventListener("click", () => {
    openPopup(profieImagePopup);
    profileZoomedImage.src = element.link;
    profileZoomedImage.alt = element.name;
    profileZoomedImageCaption.textContent = element.name;
  });

  return cardElement;
}
import {enableValidation} from './validate'
function handleFormAdd(event) {
  event.preventDefault();
  const item = {};
  item.name = newcardName.value;
  item.link = newcardImage.value;
  const placeElement = createCard(item);
  placesContainer.prepend(placeElement);
  closePopup(profileAddPopup);
  cardForm.reset()
  enableValidation()
}
export { createCard, handleFormAdd };
