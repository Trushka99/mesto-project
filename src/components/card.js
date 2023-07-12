import {
  profieImagePopup,
  profileZoomedImage,
  profileZoomedImageCaption,
  placeTemplate,
} from "./utils";

import { openPopup } from "./modal";
import { deleteCard, likeCard, disLikeCard } from "./api";
import { clientID } from "../pages/index";
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
      likeCard(element._id)
        .then(++count)
        .catch((err) => {
          console.log(err);
        });
    } else {
      disLikeCard(element._id)
        .then(--count)
        .catch((err) => {
          console.log(err);
        });
    }
    likecount.textContent = count;
  });
  const cardDeleteButton = cardElement.querySelector(".elements__delete");
  if (ownerID === clientID) {
    cardDeleteButton.classList.add("elements__delete_active");
    cardDeleteButton.addEventListener("click", () => {
      deleteCard(element._id)
        .then(cardElement.remove())
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    const parentElement = cardDeleteButton.parentNode;
    parentElement.removeChild(cardDeleteButton);
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

export { createCard };
