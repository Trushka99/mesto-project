import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this.popupImage = this.popupElement.querySelector('.popup__image');
      this.popupImageText = this.popupElement.querySelector('.popup__image-name');
    }
  
    open(src, name) {
      super.open();
      this.popupImage.src = src;
      this.popupImage.alt = name;
      this.popupImageText.textContent = name;
    }
  }