import {config} from '../pages/index.js'


export default 
class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._errorList = Array.from(document.querySelectorAll(config.errorList))
    this._formElement = formElement
  }

  _showInputError(formElement, inputElement, errorMessage) {
    this._errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass)
    this._errorElement.textContent = errorMessage;
  };

  _hideInputError (formElement, inputElement) {
    this._errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass)
    this._errorElement.textContent = '';
  };

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _setEventListener (formElement) {
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector))
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState ();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement)
        this._toggleButtonState ();
      })
    })
  }

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };


  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled','disabled');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = '';
    }
  };

  clearErrors(){
    this._inputList.forEach((input) => {
      if (input.classList.contains(this._inputErrorClass)) {
        input.classList.remove(this._inputErrorClass)
      }
    });
    this._errorList.forEach((item) => {
      item.classList.remove(this._errorClass);
      item.textContent = '';
    });
  }

  enableValidation () {
    this._formList = Array.from(document.querySelectorAll(this._formSelector))
    this._formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()

      })
      this._setEventListener(formElement)
    })
  }
}