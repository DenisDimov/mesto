
export default 
class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._errorList = document.querySelectorAll(config.errorList)
    this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector))
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass)
    this._errorElement.textContent = errorMessage;
  };

  _hideInputError (inputElement) {
    this._errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass)
    this._errorElement.textContent = '';
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListener () {
    this._toggleButtonState ();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
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
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()

    });
    this._setEventListener()
    
  }

}


