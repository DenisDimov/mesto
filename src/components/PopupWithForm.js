import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._popupForm = this._popup.querySelector('.popup__form')
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
      this.close()
    });
    super.setEventListeners()
  }

  close() {
    super.close()
    // this._popupForm.reset()
  }

  renderLoading(isLoading, button) {
    if (isLoading) {
      button.textContent = 'Сохранение...'
    }
    else if (!isLoading && (button.id === 'profile-btn' || button.id === 'avatar-btn')) {
      button.textContent = 'Сохранить'
    }
    else if (!isLoading && button.id === 'form-addBtn')
    button.textContent = 'Создать'
  }

}