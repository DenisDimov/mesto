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
const nameInput = document.querySelector('#form-name');
const jobInput = document.querySelector('#form-job');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const formAddCardSubmit = document.querySelector('#form__add-card')
const cards = document.querySelector('.card');
const itemTemplate = document.querySelector('.card-template').content
const inputFormLink = document.querySelector('#form-link')
const inputFormTitle = document.querySelector('#form-place')
const popupImageTitle = document.querySelector('.popup__image-title')

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function renderItem() {
  initialCards.forEach(function (item) {
    const newCard = createCard (item);
      renderCards (newCard);
  });
};

function createCard(item) {
	const userElement = itemTemplate.cloneNode(true);
  userElement.querySelector('.card__image').style.backgroundImage = `url('${item.link}')`
	userElement.querySelector('.card__title').textContent = item.name
  setEventListeners(userElement);
  return userElement;
  
}

// функция добавление карточки на страницу
function renderCards (newCard) {
  cards.prepend(newCard);
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
  cards.prepend(createCard(item));
  formAddCardSubmit.reset()
  togglePopup(popupTypeAddCard)
}
// удаление карточки

function handleDelete(evt) {
  evt.target.closest('.card__item').remove();
}

function handleShowImage (evt) {
  
  buttonOpenPopupImage.style.backgroundImage = evt.target.style.backgroundImage
  popupImageTitle.textContent = evt.target.closest('.card__item').textContent
  togglePopup(popupTypeShowImage)
}

function setEventListeners(element) {
  element.querySelector('.card__delete').addEventListener('click', handleDelete);
  element.querySelector('.card__icon').addEventListener('click', handleLikes);
  element.querySelector('.card__image').addEventListener('click', handleShowImage);
}

// лайк карточки

function handleLikes(evt) {
  evt.target.classList.toggle('card__icon_active')
}

// функции открытия попапа редактирования профиля
function openProfileForm() {
  
	nameInput.value = profileTitle.textContent
	jobInput.value = profileSubTitle.textContent
  togglePopup(popupTypeEdit)
};

// функция ввода данных в поля профиля
function handleProfileFormSubmit (evt) {
	evt.preventDefault();
  
	profileTitle.textContent = nameInput.value;
	profileSubTitle.textContent = jobInput.value;

	togglePopup(popupTypeEdit);
};

renderItem()

// отправка форм
formAddCardSubmit.addEventListener('submit', handlerAddCard);
formElementTypeEdit.addEventListener('submit', handleProfileFormSubmit);
// открытие/закрытие попапа с именем
buttonOpenPopupEdit.addEventListener('click', openProfileForm);
buttonClosePopupEdit.addEventListener('click', () => {togglePopup(popupTypeEdit)})
// открытие/закрытие попапа с карточками
buttonOpenPopupAddCard.addEventListener('click', () => {togglePopup(popupTypeAddCard)});
buttonClosePopupAddCard.addEventListener('click', () => {togglePopup(popupTypeAddCard)});
buttonOpenPopupImage.addEventListener('click', () => {togglePopup(popupTypeShowImage)});
buttonClosePopupImage.addEventListener('click', () => {togglePopup(popupTypeShowImage)});