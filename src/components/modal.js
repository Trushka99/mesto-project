import {
  popups,
  ESC
} from "./utils";

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.body.addEventListener("keyup", buttonClosePopup);
}


function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.body.removeEventListener("keyup", buttonClosePopup);
}

function buttonClosePopup(e) {
  const key = e.keyCode;
  popups.forEach(function (popup) {
    if (key == ESC && popup.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
}

function closePopupButton(item) {
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


export {
  openPopup,
  closePopup,
  closePopupButton,
  popupOverlay,
};
