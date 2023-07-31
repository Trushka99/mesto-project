import {
  profileEditButton,
  profileAddButton,
  cardForm,
  placesContainer,
  profileName,
  profileJob,
  avatarPic,
  overlayPic,
  profileEditName,
  profileEditJob,
  profileInfoPopup,
  popupSubmitEdit,
  popupSubmitAvatar,
  avatarPopup,
  newcardImage,
  newcardName,
  profileAddPopup,
  popupSubmitAdd,
  profieImagePopup
} from "../components/utils.js";
import 
  Api
 from "../components/api.js";
import "./index.css";
import {
  PopupWithForm,
  PopupWithImage
} from "../components/modal.js";
import {
  FormValidator
} from "../components/validate.js";
import Section from "../components/section.js";
import Card from "../components/card.js";
import UserInfo from '../components/userinfo.js'

const api = new Api({
  url: "https://nomoreparties.co/v1/plus-cohort-26",
  headers: {
    authorization: "6bb49ea4-9d7a-4a97-8f53-ee02190921e9",
    "Content-Type": "application/json",
  },
});

const profileEditPopup = new PopupWithForm(profileInfoPopup, handleProfileFormSubmit);
const addCardPopup = new PopupWithForm(profileAddPopup, handleFormAdd)
const avatarPopupObj = new PopupWithForm(avatarPopup, editAvatar);
const zoomedImage = new PopupWithImage(profieImagePopup);
zoomedImage.setEventListeners()

function openPopupEditProfile() {
  profileEditPopup.open();
  profileEditName.value = profileName.textContent;
  profileEditJob.value = profileJob.textContent;
}

function openPopupAddCard() {
  addCardPopup.open();
}

function openPopupAvatar() {
  avatarPopupObj.open();
}

function renderLoading(isLoading, button, text, text2) {
  if (isLoading) {
    button.textContent = text;
  } else {
    button.textContent = text2;
  }
}

function handleProfileFormSubmit(data) {
  console.log(data[0]);
  renderLoading(true, popupSubmitEdit, "Сохранение..", "Сохранить");
  api.editProfile(data[0], data[1])
    .then(
      (profileName.textContent = data[0].value),
      (profileJob.textContent = data[1].value),
      profileEditPopup.close()
    )
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupSubmitEdit, "Сохранение..", "Сохранить");
    });

  /*buttonStateDisabled(popupSubmitEdit, "popup__submit_inactive");*/
}

function editAvatar(avatarInput) {
  renderLoading(true, popupSubmitAvatar, "Сохранение..", "Сохранить");
  api.editavatar(avatarInput[0])
    .then((avatarPic.src = avatarInput[0].value), avatarPopupObj.close())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupSubmitAvatar, "Сохранение..", "Сохранить");
    });
}

export let clientID;

const userInfo = new UserInfo({
  nameSelector: profileName,
  aboutSelector: profileJob,
  avatarSelector: avatarPic,
});
api.getInitialProfile().then((res) => {
  userInfo.gettUserInfo({name:res.name, about:res.about, avatar: res.avatar})
  clientID = res._id
}).catch((err) => {
  console.log(err)
})


overlayPic.onmouseover = function () {
  overlayPic.classList.add("profile__avatar_hover_active");
};
overlayPic.onmouseout = function () {
  overlayPic.classList.remove("profile__avatar_hover_active");
};


overlayPic.addEventListener("click", openPopupAvatar);
profileEditButton.addEventListener("click", openPopupEditProfile);
profileAddButton.addEventListener("click", openPopupAddCard);
// Закрытие попапов

profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopupObj.setEventListeners();

// Создание карточки


const profileValidate = new FormValidator({
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_error",
}, profileInfoPopup);

profileValidate.enableValidation();

const addCardValidate = new FormValidator({
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_error",
}, profileAddPopup);

addCardValidate.enableValidation();

const avatarFormValidate = new FormValidator({
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_error",
}, avatarPopup);

avatarFormValidate.enableValidation();


const placeTemplate = document.querySelector("#place-template").content;

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
    zoomImage: () => { zoomedImage.open(data.link,data.name) },
  });
  return card.generate();
}
// заполнение карточками с сервера
api
  .getInitialCards()
  .then((res) => {
    console.log(res)
    const rendercards = new Section(
      {
        data: res,
        renderer: (item) => {
          rendercards.setItem(createCards(item));
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
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupSubmitAdd, "Создание...", "Создать");
      cardForm.reset();
      addCardPopup.close()
      
    });
}
