import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(item) {
    this._image = this._popup.querySelector('.popup__image')
    this._link = this._popup.querySelector('.popup__image-title')
    this._image.style.backgroundImage = `url('${item.link}')`
    this._link.textContent = item.name
    super.open()
  }

}
