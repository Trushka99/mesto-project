import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
      super(popupSelector);
      this.formSubmit = formSubmit;
      this.inputsArray = Array.from(this.popupElement.querySelectorAll('.popup__input'));
      console.log(this.inputsArray);
    }
  
    _getInputValues() { 
      const inputsValues = this.inputsArray.map((input) => {
        return {
          value: input.value
        };
      });

      const inputObj = { value: inputsValues };
      console.log(inputObj);
      return inputObj;
    }
  
    close() {
      super.close();
      this.popupElement.querySelector('.popup__form').reset();
    }

    renderLoading(isLoading, button, text, text2) {
      if (isLoading) {
        button.textContent = text;
      } else {
        button.textContent = text2;
      }
    }
  
    setEventListeners() {
      super.setEventListeners();
      this.popupElement.addEventListener('submit', (evt) => {
        this.formSubmit(this._getInputValues());
      })
    }
  }