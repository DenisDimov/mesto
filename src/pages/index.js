import './index.css'

import Card from '../components/Card.js'
import {initialCards} from '../components/initial-сards.js'
import FormValidator from '../components/FormValidator.js'
export {config}
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'

const buttonOpenPopupEdit = document.querySelector('.profile__btn');
const buttonOpenPopupAddCard = document.querySelector('.profile__add-card');
const nameInput = document.querySelector('.form__name');
const jobInput = document.querySelector('.form__job');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const inputFormLink = document.querySelector('.form__link');
const inputFormTitle = document.querySelector('.form__place');
const buttonAddcard = document.querySelector('.popup__button')

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active',
  errorList: '.form__input-error'
}

const formValidator = new FormValidator(config, '.popup__form')
formValidator.enableValidation()

const popupImage = new PopupWithImage('.popup_type_image')
const userInfo = new UserInfo(profileTitle, profileSubTitle)
const popupProfile = new PopupWithForm('.popup_type_edit', {handleFormSubmit: () => {
  userInfo.setUserInfo(nameInput.value, jobInput.value)
}})



const sectionCard = new Section('.card', {items: initialCards, renderer: (cardItem) => {
  const card = new Card(cardItem, '.card-template', {handleCardClick: () => {
    popupImage.open(cardItem)
    popupImage.setEventListeners()
  }})
  const cardElement = card.generateCard()
  sectionCard.addItem(cardElement);
}})

const popupCard = new PopupWithForm('.popup_type_new-card', {handleFormSubmit: ({place, Link}) => {
  const card = new Card({name: place, link: Link}, '.card-template', {handleCardClick: () => {
    popupImage.open({name: place, link: Link})
    popupImage.setEventListeners()
    inputFormLink.value = ''
    inputFormTitle.value = ''
  }})
  const cardElement = card.generateCard()
  sectionCard.addItem(cardElement);
  buttonAddcard.setAttribute('disabled', 'disabled')
  buttonAddcard.classList.add('form__submit_inactive')
  }})

sectionCard.renderItems()


buttonOpenPopupEdit.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().Name
  jobInput.value = userInfo.getUserInfo().Job
  formValidator.clearErrors()
  popupProfile.open()
});

buttonOpenPopupAddCard.addEventListener('click', () => {
  formValidator.clearErrors()
  popupCard.open()
})

popupProfile.setEventListeners()
popupCard.setEventListeners()