export class FormValidator {
  constructor(data, formToValidate) {
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;
    this.formToValidate = formToValidate;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this.formToValidate.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this.formToValidate.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  };
  
  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
    inputElement.setCustomValidity("");
  }
  
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage,);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  _disableButton = (buttonElement) => {
    buttonElement.setAttribute('disabled', '');
  }
  
  _setEventListeners = () => {
    const inputList = Array.from(this.formToValidate.querySelectorAll(this.inputSelector));
    const buttonElement = this.formToValidate.querySelector(this.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
      this.formToValidate.addEventListener('reset', () => {
        this._disableButton(buttonElement);
        this._hideInputError(inputElement);
      });
    });
  };
  
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  _toggleButtonState = (inputList, buttonElement) => {
    if(this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    }
    else {
      buttonElement.removeAttribute('disabled');
    }
  };

  enableValidation() {
    this.formToValidate.addEventListener('submit', (evt) => {
     evt.preventDefault();
    });
    this._setEventListeners();
  };
}