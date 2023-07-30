export class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
  }

  open() {
    this.popupSelector.classList.add("popup_opened");
    document.body.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
  
  close() {
    this.popupSelector.classList.remove("popup_opened");
    document.body.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt)
    });
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this.popupSelector.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__overlay')) {
        this.close();
      }
    });
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(src, name) {
    this.popupSelector.classList.add("popup_opened");
    const popupImage = this.popupSelector.querySelector('.popup__image');
    document.body.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    popupImage.src = src;
    popupImage.alt = name;
    this.popupSelector.querySelector('.popup__image-name').textContent = name;
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this.formSubmit = formSubmit;
  }

  _getInputValues() {
    const inputsArray = Array.from(this.popupSelector.querySelectorAll('.popup__input'));
    const inputsValues = inputsArray.map((input) => {
      return {
        value: input.value
      };
    });
    console.log(inputsValues);
    return inputsValues;
  }

  close() {
    this.popupSelector.classList.remove("popup_opened");
    document.body.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt)
    });
    this.popupSelector.querySelector('.popup__form').reset();
  }

  setEventListeners() {
    this.popupSelector.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__overlay')) {
        this.close();
      }
    });
    this.popupSelector.addEventListener('submit', (evt) => {
      this.formSubmit(this._getInputValues());
    })
  }
}