import Popup from "./Popup.js";

export default
class PopupWithSubmit extends Popup {
  constructor(popupSelector, {submitDelete}) {
    super(popupSelector)
    this._popupButtonDelete = this._popup.querySelector('.popup__button')
    this._submitDelete = submitDelete
  }

  setEventListeners() {
    this._popupButtonDelete.addEventListener('click', (evt) => {
      evt.preventDefault()
      this._submitDelete();
    });
    super.setEventListeners();
  }

}