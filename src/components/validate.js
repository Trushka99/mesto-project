export class FormValidator {
  constructor(data, formToValidate) {
    this.inputSelector = data.inputSelector;
    this.submitButtonSelector = data.submitButtonSelector;
    this.inputErrorClass = data.inputErrorClass;
    this.errorClass = data.errorClass;
    this.formToValidate = formToValidate;
  }

  _showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  
  _hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
  
  _checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
    inputElement.setCustomValidity("");
  }
  
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  };
  
  _disableButton = (buttonElement) => {
    buttonElement.setAttribute('disabled', '');
  }
  
  _setEventListeners = (form, inputSelector, submitButtonSelector, inputErrorClass, errorClass) => {
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const buttonElement = form.querySelector(submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(form, inputElement, inputErrorClass, errorClass);
        this._toggleButtonState(inputList, buttonElement);
      });
      form.addEventListener('reset', () => {
        this._disableButton(buttonElement);
        this._hideInputError(form, inputElement, inputErrorClass, errorClass);
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
    this._setEventListeners(this.formToValidate, this.inputSelector, this.submitButtonSelector, this.inputErrorClass, this.errorClass);
  };
}