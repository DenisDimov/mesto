import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._popupForm = this._popup.querySelector('.popup__form')
    this._popupButton = this._popupForm.querySelector('.popup__button')
  }

  getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input')
    this._formValues = {}
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this.getInputValues())
      // this.close()
    });
    super.setEventListeners()
  }

  close() {
    super.close()
    this._popupForm.reset()
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = 'Сохранение...'
    }
    else {
      this._popupButton.textContent = 'Сохранить'
    }
  }
}