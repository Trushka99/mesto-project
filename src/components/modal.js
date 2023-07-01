import { profileInfoPopup, profileAddPopup,popups } from "./utils";

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.body.addEventListener("keyup",buttonClosePopup)
}

function openPopupEdit() {
  openPopup(profileInfoPopup);
  profileEditName.value = profileName.textContent;
  profileEditJob.value = profileJob.textContent;
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
    if (key == 27) {
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

const profileEditName = document.querySelector("#popup_name");
const profileEditJob = document.querySelector("#popup_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__subname");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditName.value;
  profileJob.textContent = profileEditJob.value;
  closePopup(profileInfoPopup);
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
