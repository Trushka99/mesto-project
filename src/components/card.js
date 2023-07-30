import {
  profieImagePopup,
  profileZoomedImage,
  profileZoomedImageCaption,
  placeTemplate,
} from "./utils";

import {PopupWithImage} from "./modal.js";

import { deleteCard, likeCard, disLikeCard } from "./api";
import { clientID } from "../pages/index";
function createCard(element, count, ownerID, likesmassive) {
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
  likesmassive.forEach((item) => {
    if (item._id === clientID) {
      cardLikeButton.classList.add("elements__heart_status_active");
    }
  });
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("elements__heart_status_active");
    if (cardLikeButton.classList.contains("elements__heart_status_active")) {
      likeCard(element._id)
        .then(++count)
        .then()
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

  const zoomedPopup = new PopupWithImage(profieImagePopup);

  zoomedPopup.setEventListeners();

  cardImage.addEventListener("click", () => {
    zoomedPopup.open(element.link, element.name);
    /*profileZoomedImage.src = element.link;
    profileZoomedImage.alt = element.name;
    profileZoomedImageCaption.textContent = element.name;*/
  });

  return cardElement;
}

export { createCard };

export default class Card {
  constructor(card, template, clientID, likesmassive, Data, handleActions) {
    // Данные с карточками и template элемент
    this._card = card;
    this._name = this._card.name;
    this._image = this._card.link;
    this._cardTemplate = template;
    // Данные для пользователя
    this._clientID = clientID;
    this._ownerId = this._card.owner._id;
    this._likes = this._card.likes;
    this._count = this._likes.length;

    // Handle данные
    this._cardRemove = cardActions.cardDelete;
    this._putLikes = cardActions.putLike;
    this._dislike = cardActions.dislike;
  }

  _getElement() {
    const cardElement = this._cardTemplate
      .querySelector(".elements__element")
      .cloneNode(true);

    return cardElement;
  }
  _getLikes() {
    this._likes.forEach((item) => {
      if (item._id === this._clientID) {
        this._cardLikeButton.classList.add("elements__heart_status_active");
      }
    });
  }
  _putLike() {
    this._cardLikeButton.classList.toggle("elements__heart_status_active");
    if (
      this._cardLikeButton.classList.contains("elements__heart_status_active")
    ) {
      this._putLikes(this._card._id);
    } else {
      this._dislike(this._card._id);
    }
  }
  countLike() {
    if (
      this._cardLikeButton.classList.contains("elements__heart_status_active")
    ) {
      this._likeCount.textContent++;
    } else {
      this._likeCount.textContent--;
    }
  }
  deleteCard() {
    this._element.remove();
  }
  generate() {
    this._element = this._getElement();
    this._cardImage = this._element.querySelector(".elements__image");
    this._cardImage.src = this._image;
    this._cardName = this._element.querySelector(".elements__description");
    this._cardName.textContent = this._name;

    this._cardLikeButton = this._element.querySelector(".elements__heart");
    this._likeCount = this._element.querySelector(".elements__heart-count");
    this._getLikes();
    this._likeCount.textContent = this._count;
    this._cardDeleteButton = this._element.querySelector(".elements__delete");
    this._setEventHandlers();
    return this._element;
  }
  _setEventHandlers = () => {
    this._cardLikeButton.addEventListener("click", () => this._putLike());

    if (this._ownerId === this._clientID) {
      this._cardDeleteButton.classList.add("elements__delete_active");
      this._cardDeleteButton.addEventListener("click", () =>
        this._cardRemove(this._element, this._card._id)
      );
    } else {
      this._cardDeleteButton.remove();
    }
  };
}
