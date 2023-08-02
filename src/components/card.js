export default class Card {
  constructor(card, template, clientID, cardActions) {
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
    this._zoomImage = cardActions.zoomImage;
  }

  _getElement() {
    const cardElement = this._cardTemplate
      .querySelector(".elements__element")
      .cloneNode(true);

    return cardElement;
  }
  _getLikes(card) {
    this._likes = card.likes;
    this._count = this._likes.length;
    this._likeCount.textContent = this._count;
    if (this._likeStatus()) {
      this._cardLikeButton.classList.remove("elements__heart_status_active");
    } else {
      this._cardLikeButton.classList.add("elements__heart_status_active");
    }
  }
  _likeStatus() {
    return this._cardLikeButton.classList.contains(
      "elements__heart_status_active"
    );
  }
  _interactLike() {
    if (this._likeStatus()) {
      this._dislike(this._card._id);
    } else {
      this._putLikes(this._card._id);
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
    this._likeCount.textContent = this._count;
    this._likes.forEach((item) => {
      if (item._id === this._clientID) {
        this._cardLikeButton.classList.add("elements__heart_status_active");
      } else {
        this._cardLikeButton.classList.remove("elements__heart_status_active");
      }
    });
    this._cardDeleteButton = this._element.querySelector(".elements__delete");
    this._setEventHandlers();
    return this._element;
  }
  _setEventHandlers = () => {
    this._cardLikeButton.addEventListener("click", () => this._interactLike());
    this._cardImage.addEventListener("click", () => this._zoomImage());
    if (this._ownerId === this._clientID) {
      this._cardDeleteButton.classList.add("elements__delete_active");
      this._cardDeleteButton.addEventListener("click", () =>
        this._cardRemove(this._card._id)
      );
    } else {
      this._cardDeleteButton.remove();
    }
  };
}