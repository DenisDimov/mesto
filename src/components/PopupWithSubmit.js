import Popup from "./Popup.js";

export default
class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupButtonDelete = this._popup.querySelector('.popup__button')
  }

  setHandleSubmit(handle) {
    this._handleSubmit = handle;
  }

  setEventListeners() {
    this._popupButtonDelete.addEventListener('click', () => {
      this._handleSubmit()
    });
    super.setEventListeners();
  }

}