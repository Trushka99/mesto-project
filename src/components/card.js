import {
  newcardImage,
  newcardName,
  profileAddPopup,
  profieImagePopup,
  profileZoomedImage,
  profileZoomedImageCaption,
  placesContainer,
  placeTemplate,
  cardForm,
  popupSubmitAdd,
} from "./utils";

import { openPopup, closePopup } from "./modal";
import { deleteCard, cardLiked, cardDisliked } from "./api";

function createCard(element, count, ownerID) {
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
  const likecount = cardElement.querySelector(".elements__heart-count");
  likecount.textContent = count;
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("elements__heart_status_active");
    if (cardLikeButton.classList.contains("elements__heart_status_active")) {
      ++count;
      cardLiked(element._id);
    } else {
      --count;
      cardDisliked(element._id);
    }
    likecount.textContent = count;
  });
  if (ownerID === "26ba9d61f275b3dbc1475523") {
    const cardDeleteButton = cardElement.querySelector(".elements__delete");
    cardDeleteButton.classList.add("elements__delete_active");
    cardDeleteButton.addEventListener("click", () => {
      deleteCard(element._id);
      cardElement.remove();
    });
  } else {
    const h1 = cardElement.querySelector(".elements__delete");
    const parent = h1.parentNode;
    parent.removeChild(h1);
  }
  // Попап с увеличенным изображением
  cardImage.addEventListener("click", () => {
    openPopup(profieImagePopup);
    profileZoomedImage.src = element.link;
    profileZoomedImage.alt = element.name;
    profileZoomedImageCaption.textContent = element.name;
  });

  return cardElement;
}
import { buttonStateDisabled } from "./validate";
import { addedCard } from "./api";
function handleFormAdd() {
  const item = {};
  item.name = newcardName.value;
  item.link = newcardImage.value;
  const placeElement = createCard(item);
  placesContainer.prepend(placeElement);
  addedCard(newcardName, newcardImage);
  closePopup(profileAddPopup);
  cardForm.reset();
  buttonStateDisabled(popupSubmitAdd, "popup__submit_inactive");
}
export { createCard, handleFormAdd };
