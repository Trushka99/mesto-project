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
  getInitialCards,
  getInitialProfile,
  editProfile,
  renderLoading,
  editavatar,
  addCard,
} from "../components/api.js";
import "./index.css";
import {
  PopupWithForm
} from "../components/modal.js";
import { createCard } from "../components/card.js";
import {
  FormValidator
} from "../components/validate.js";

const profileEditPopup = new PopupWithForm(profileInfoPopup, handleProfileFormSubmit);
const addCardPopup = new PopupWithForm(profileAddPopup, handleFormAdd);
const avatarPopupObj = new PopupWithForm(avatarPopup, editAvatar);


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

function handleProfileFormSubmit(data) {
  console.log(data[0]);
  renderLoading(true, popupSubmitEdit, "Сохранение..", "Сохранить");
  editProfile(data[0], data[1])
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
  editavatar(avatarInput[0])
    .then((avatarPic.src = avatarInput[0].value), avatarPopupObj.close())
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


overlayPic.addEventListener("click", openPopupAvatar);
profileEditButton.addEventListener("click", openPopupEditProfile);
profileAddButton.addEventListener("click", openPopupAddCard);
// Закрытие попапов

profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopupObj.setEventListeners();

// Создание карточки

// Добавление карточки и реализация остальных функций на новых элементах
function handleFormAdd(data) {
  renderLoading(true, popupSubmitAdd, "Создание...", "Создать");
  addCard(data[0], data[1])
    .then((data) => {
      const placeElement = createCard(
        data,
        data.likes.length,
        data.owner._id,
        data.likes
      );
      placesContainer.prepend(placeElement);
    })
    .then(addCardPopup.close())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupSubmitAdd, "Создание...", "Создать");
    });
}


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

// import Section from '../components/section.js'


getInitialCards()
  .then((result) => {
    result.forEach(function (item) {
      const placeElement = createCard(
        item,
        item.likes.length,
        item.owner._id,
        item.likes
      );
      placesContainer.append(placeElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });


  // const initialCardList = new Section({
  //   data: items,
  //   renderer: (item) => {
  //     const card = new DefaultCard(item, '.default-card');
  //     const cardElement = card.generate();
  //     defaultCardList.setItem(cardElement);
  //   }
  // }, cardListSelector);