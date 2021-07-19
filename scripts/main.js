export {openPopup, popupTypeShowImage, buttonOpenPopupImage, popupImageTitle}
import Card from './Card.js'
import {initialCards} from './initial-сards.js'
import FormValidator from './FormValidator.js'
export {config}

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_new-card');
const popupTypeShowImage = document.querySelector('.popup_type_image')

const buttonOpenPopupEdit = document.querySelector('.profile__btn');
const buttonOpenPopupAddCard = document.querySelector('.profile__add-card');
const buttonOpenPopupImage = document.querySelector('.popup__image')
const buttonClosePopupEdit = document.querySelector('.popup__close_edit');
const buttonClosePopupAddCard = document.querySelector('.popup__close_add_card');
const buttonClosePopupImage = document.querySelector('.popup__close_image')

const formElementTypeEdit = document.querySelector('.form_type_edit');
const nameInput = document.querySelector('.form__name');
const jobInput = document.querySelector('.form__job');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const formAddCardSubmit = document.querySelector('#form__add-card');
const cards = document.querySelector('.card');
const inputFormLink = document.querySelector('.form__link');
const inputFormTitle = document.querySelector('.form__place');
const popupImageTitle = document.querySelector('.popup__image-title');
const buttonAddcard = document.querySelector('.popup__button')

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
}

const formValidator = new FormValidator(config, '.popup__form')
formValidator.enableValidation()


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp)
}

const handleEscUp = (evt) => {
  const popup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', handleEscUp)
}

function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(evt.target);
  }
}

function renderInitialCards() {
  initialCards.forEach(function (item) {
    const card = new Card(item, '.card-template')
    const cardElement = card.generateCard()
    document.querySelector('.card').append(cardElement);
  });
};

// добавление карточек на страницу

function handlerAddCard(evt) {
  evt.preventDefault()
  const formItemTitle = inputFormTitle.value
  const formItemLink = inputFormLink.value
  const item = {
    name: formItemTitle,
    link: formItemLink
  }
  const card = new Card(item, '.card-template')
  const cardElement = card.generateCard()
  document.querySelector('.card').prepend(cardElement);
  buttonAddcard.setAttribute('disabled', 'disabled')
  buttonAddcard.classList.add('form__submit_inactive')
  closePopup(popupTypeAddCard)
 }

// функции открытия попапа редактирования профиля
function openProfileForm() {
  openPopup(popupTypeEdit)
	nameInput.value = profileTitle.textContent
	jobInput.value = profileSubTitle.textContent
  formAddCardSubmit.reset()
};

// функция ввода данных в поля профиля
function handleProfileFormSubmit (evt) {
	evt.preventDefault();
  
	profileTitle.textContent = nameInput.value;
	profileSubTitle.textContent = jobInput.value;
	closePopup(popupTypeEdit);
};


renderInitialCards()

// отправка форм
formAddCardSubmit.addEventListener('submit', handlerAddCard);
formElementTypeEdit.addEventListener('submit', handleProfileFormSubmit);

// открытие/закрытие попапа с именем
buttonOpenPopupEdit.addEventListener('click', openProfileForm);

// открытие/закрытие попапа с карточками
buttonOpenPopupAddCard.addEventListener('click', () => {openPopup(popupTypeAddCard), formAddCardSubmit.reset()});
buttonOpenPopupImage.addEventListener('click', () => {openPopup(popupTypeShowImage)});
popupTypeShowImage.addEventListener('mousedown', closePopupOverlay)
popupTypeAddCard.addEventListener('mousedown', closePopupOverlay)
popupTypeEdit.addEventListener('mousedown', closePopupOverlay)
buttonClosePopupEdit.addEventListener('click', () => {closePopup(popupTypeEdit)})
buttonClosePopupAddCard.addEventListener('click', () => {closePopup(popupTypeAddCard)})
buttonClosePopupImage.addEventListener('click', () => {closePopup(popupTypeShowImage)})