import {openPopup, popupTypeShowImage, buttonOpenPopupImage, popupImageTitle} from './main.js'
export default
class Card {
  constructor(item, cardSelector) {
    this._link = item.link
    this._name = item.name
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate()
    

    this._element.querySelector('.card__image').style.backgroundImage = `url('${this._link}')`
    this._element.querySelector('.card__title').textContent = this._name
    this._elementLike = this._element.querySelector('.card__icon')
    this._setEventListeners()
    return this._element
  }

  _handleDelete() {
    this._element.remove()
    this._element = null
  }

  _handleLikes() {
    this._elementLike.classList.toggle('card__icon_active')
  }

  _handleShowImage() {
    openPopup(popupTypeShowImage)
    buttonOpenPopupImage.style.backgroundImage = `url('${this._link}')`
    popupImageTitle.textContent = this._name
  }

  _setEventListeners() {
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDelete()
    });
    this._elementLike.addEventListener('click', () => {
      this._handleLikes()
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleShowImage()
    });
  }

}
