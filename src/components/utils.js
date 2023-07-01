// Данные массива
const initialcards = [
  {
    name: "Дио Брандо",
    link: "../src/images/zJrhrGS__400x400.jpg",
  },
  {
    name: "Джозеф",
    link: "../src/images/joseph.jpg",
  },
  {
    name: "Карс",
    link: "../src/images/Kars_Infobox_Manga.jpg",
  },
  {
    name: "Лиза Лиза",
    link: "../src/images/16521838341462763.jpg",
  },
  {
    name: "Джоске",
    link: "../src/images/josuke.png",
  },
  {
    name: "Джотаро",
    link: "../src/images/jotaro.jpg",
  },
];
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileInfoPopup = document.querySelector(".popup_function_edit");
const profileAddPopup = document.querySelector(".popup_function_add");
const profileForm = document.querySelector(".popup__form_redact");
const cardForm = document.querySelector(".popup__form_add");
const profileEditName = document.querySelector("#popup_name");
const profileEditJob = document.querySelector("#popup_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__subname");
const newcardName = profileAddPopup.querySelector(".popup__input_name");
const newcardImage = profileAddPopup.querySelector(".popup__input_picture");
const profieImagePopup = document.querySelector(".popup_function_zoom");
const profileZoomedImage = document.querySelector(".popup__image");
const profileZoomedImageCaption = document.querySelector(".popup__image-name");
const placesContainer = document.querySelector(".elements");
const placeTemplate = document.querySelector("#place-template").content;
const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".popup__close");
export {
  initialcards,
  profileEditButton,
  profileAddButton,
  profileInfoPopup,
  profileAddPopup,
  profileForm,
  cardForm,
  profileEditName,
  profileEditJob,
  profileName,
  profileJob,
  newcardName,
  newcardImage,
  profieImagePopup,
  profileZoomedImage,
  profileZoomedImageCaption,
  placesContainer,
  placeTemplate,
  popups,
  closeButtons,
};
