export class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this.popupElement.classList.add("popup_opened");
    document.body.addEventListener("keydown", this._handleEscClose)
  }
  
  close() {
    this.popupElement.classList.remove("popup_opened");
    document.body.addEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this.popupElement.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__overlay')) {
        this.close();
      }
    });
  }
}