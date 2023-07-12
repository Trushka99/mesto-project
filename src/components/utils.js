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
const popupSubmitAdd = document.querySelector(".popup__submit_function_add");
const popupSubmitEdit = document.querySelector(".popup__submit_function_edit");
const avatarInput = document.querySelector("#popup_avatar");
const avatarPic = document.querySelector(".profile__avatar");
const overlayPic = document.querySelector(".profile__avatar_hover");
const avatarForm = document.querySelector(".popup__form_avatar");
const popupSubmitAvatar = document.querySelector(".popup__submit_avatar");
const ESC = 27;
const avatarPopup = document.querySelector(".popup_function_avatar");

export {
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
  popupSubmitAdd,
  popupSubmitEdit,
  avatarInput,
  avatarPic,
  overlayPic,
  avatarForm,
  popupSubmitAvatar,
  ESC,
  avatarPopup,
};
