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
  PopupWithForm
} from "../components/PopupWithForm.js";
import {
  PopupWithImage
} from "../components/PopupWithImage.js";
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

const profileEditPopup = new PopupWithForm(".popup_function_edit", handleProfileFormSubmit);
const addCardPopup = new PopupWithForm(".popup_function_add", handleFormAdd)
const avatarPopupObj = new PopupWithForm(".popup_function_avatar", editAvatar);
const zoomedImage = new PopupWithImage(".popup_function_zoom");
zoomedImage.setEventListeners()

function openPopupEditProfile() {
  profileEditPopup.open();
  const userInfoObject = userInfo.getUserInfo();
  profileEditName.value = userInfoObject.name;
  profileEditJob.value = userInfoObject.about;
}

function openPopupAddCard() {
  addCardPopup.open();
}

function openPopupAvatar() {
  avatarPopupObj.open();
}

function handleProfileFormSubmit(data) {
  renderLoading(true, popupSubmitEdit, "Сохранение..", "Сохранить");
  api.editProfile(data.value[0], data.value[1])
    .then(
      (profileName.textContent = data.value[0].value),
      (profileJob.textContent = data.value[1].value)
    )
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false, popupSubmitEdit, "Сохранение..", "Сохранить");
      profileEditPopup.close();
    });
}

function editAvatar(avatarInput) {
  renderLoading(true, popupSubmitAvatar, "Сохранение..", "Сохранить");
  api.editavatar(avatarInput.value[0])
    .then((avatarPic.src = avatarInput.value[0].value), avatarPopupObj.close())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopupObj.renderLoading(false, popupSubmitAvatar, "Сохранение..", "Сохранить");
      avatarPopupObj.close();
    });
}

export let clientID;

const userInfo = new UserInfo({
  nameSelector: profileName,
  aboutSelector: profileJob,
  avatarSelector: avatarPic,
});


overlayPic.onmouseover = function () {
  overlayPic.classList.add("profile__avatar_hover_active");
};
overlayPic.onmouseout = function () {
  overlayPic.classList.remove("profile__avatar_hover_active");
};


overlayPic.addEventListener("click", openPopupAvatar);
profileEditButton.addEventListener("click", openPopupEditProfile);
profileAddButton.addEventListener("click", openPopupAddCard);

profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopupObj.setEventListeners();



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
    cardDelete: (cardId) => {
      api
        .deleteCard(cardId)
        .then(() => {
          card.deleteCard()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    putLike: (cardId) => {
      api
        .likeCard(cardId)
        .then((res) => {
          card._getLikes(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dislike: (cardId) => {
      api
        .disLikeCard(cardId)
        .then((res) => {
          card._getLikes(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    zoomImage: () => { zoomedImage.open(data.link,data.name) },
  });
  return card.generate();
}
// заполнение карточками и профиля с сервера
Promise.all([ api.getInitialProfile(), api.getInitialCards() ]).then(([ userData, cardData ]) => {
  clientID = userData._id;
  userInfo.settUserInfo({name:userData.name, about:userData.about, avatar: userData.avatar})
  const rendercards = new Section(
    {
      data: cardData,
      renderer: (item) => {
        rendercards.setItem(createCards(item));
      },
    },
    placesContainer
  );
  rendercards.renderItems();
})
.catch((err) => { console.log(`Возникла ошибка, ${err}`) })
// функция добавления карточки
function handleFormAdd() {
  addCardPopup.renderLoading(true, popupSubmitAdd, "Создание...", "Создать");
  api
    .addCard(newcardName, newcardImage)
    .then((res) => {
      const rendercards = new Section({data: res,  renderer: () => {
        rendercards.setItem(createCards(res));
      }},placesContainer)
      rendercards.setItem(createCards(res))
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false, popupSubmitAdd, "Создание...", "Создать");
      cardForm.reset();
      addCardPopup.close()
      
    });
}
