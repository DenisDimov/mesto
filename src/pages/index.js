import './index.css'

import Card from '../components/Card.js'
import {initialCards} from '../components/initial-сards.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'
import {config} from '../components/constants.js'

const popupCardValid = document.querySelector('.form_type_card')
const popupProfileValid = document.querySelector('.form_type_edit')
const buttonOpenPopupEdit = document.querySelector('.profile__btn');
const buttonOpenPopupAddCard = document.querySelector('.profile__add-card');
const nameInput = document.querySelector('.form__name');
const jobInput = document.querySelector('.form__job');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const inputFormLink = document.querySelector('.form__link');
const inputFormTitle = document.querySelector('.form__place');
const buttonAddcard = document.querySelector('.popup__button')



const formValidatorCard = new FormValidator(popupCardValid, config)
formValidatorCard.enableValidation()

const formValidatorProfile = new FormValidator(popupProfileValid, config)
formValidatorProfile.enableValidation()


const popupImage = new PopupWithImage('.popup_type_image')
const userInfo = new UserInfo(profileTitle, profileSubTitle)
const popupProfile = new PopupWithForm('.popup_type_edit', {handleFormSubmit: () => {
  userInfo.setUserInfo(nameInput.value, jobInput.value)
}})

function createCard(item) {
  const card = new Card(item, '.card-template', {handleCardClick: () => {
    popupImage.open(item)
    inputFormLink.value = ''
    inputFormTitle.value = ''
    popupImage.setEventListeners()
  }})
  return card.generateCard(item)
}

const sectionCard = new Section('.card', {items: initialCards, renderer: (cardItem) => {
  const addCard = createCard(cardItem)
  sectionCard.addItem(addCard)
}})

const popupCard = new PopupWithForm('.popup_type_new-card', {handleFormSubmit: ({place, Link}) => {
  const addCard = createCard({name: place, link: Link})
  sectionCard.addItem(addCard)
  buttonAddcard.setAttribute('disabled', 'disabled')
  buttonAddcard.classList.add('form__submit_inactive')
  }})

sectionCard.renderItems()


buttonOpenPopupEdit.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().Name
  jobInput.value = userInfo.getUserInfo().Job
  formValidatorProfile.clearErrors()
  popupProfile.open()
});

buttonOpenPopupAddCard.addEventListener('click', () => {
  formValidatorCard.clearErrors()
  popupCard.open()
})

popupProfile.setEventListeners()
popupCard.setEventListeners()
popupImage.setEventListeners()