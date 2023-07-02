import { profileInfoPopup, profileAddPopup,popups,profileForm,profileEditName, profileEditJob, profileName, profileJob, popupSubmitEdit} from "./utils";
import {hideInputError, buttonStateDisabled} from './validate'
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.body.addEventListener("keyup",buttonClosePopup)
}

function openPopupEdit() {
  openPopup(profileInfoPopup);
  profileEditName.value = profileName.textContent;
  profileEditJob.value = profileJob.textContent;
  const input = profileInfoPopup.querySelectorAll('.popup__input')
  input.forEach((input) => {
    hideInputError(profileForm,input )
  })
}
function openPopupAdd() {
  openPopup(profileAddPopup);
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.body.removeEventListener("keyup",buttonClosePopup)
}

function buttonClosePopup (e) {
  const key = e.keyCode;
  popups.forEach(function (popup) {
    if (key == 27 && popup.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
}

function closePopupButton (item) {
  const popup = item.closest(".popup");
  item.addEventListener("click", () => closePopup(popup));
}

function popupOverlay(item, el) {
  if (item.target === el) {
    closePopup(el);
  } else {
    item.stopPropagation();
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditName.value;
  profileJob.textContent = profileEditJob.value;
  closePopup(profileInfoPopup);
  buttonStateDisabled(popupSubmitEdit, 'popup__submit_inactive')
}

export {
  openPopup,
  openPopupEdit,
  openPopupAdd,
  closePopup,
  handleProfileFormSubmit,
  closePopupButton,
  popupOverlay
};
