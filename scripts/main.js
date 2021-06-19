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
const itemTemplate = document.querySelector('.card-template').content
const inputFormLink = document.querySelector('.form__link');
const inputFormTitle = document.querySelector('.form__place');
const popupImageTitle = document.querySelector('.popup__image-title');

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
  errorReset()
}

function errorReset() {
  const button = document.querySelector('.popup__button')
  button.setAttribute('disabled', 'disabled')
  button.classList.add('form__submit_inactive')
  formAddCardSubmit.reset()
}

function closePopupOverlay(evt) {
  const popup = document.querySelector('.popup_opened')
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(popup);
  }
}

function renderInitialCards() {
  initialCards.forEach(function (item) {
    const newCard = createCard (item);
      renderCards (newCard);
  });
};

function createCard(item) {
	const userElement = itemTemplate.cloneNode(true);
  userElement.querySelector('.card__image').style.backgroundImage = `url('${item.link}')`
	userElement.querySelector('.card__title').textContent = item.name
  // карточки сверстаны через background-image, у них нет атрибута alt
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
  closePopup(popupTypeAddCard)
}
// удаление карточки

function handleDelete(evt) {
  evt.target.closest('.card__item').remove();
}

function handleShowImage (evt) {
  openPopup(popupTypeShowImage)
  buttonOpenPopupImage.style.backgroundImage = evt.target.style.backgroundImage
  popupImageTitle.textContent = evt.target.closest('.card__item').textContent
  // карточки сверстаны через background-image, у них нет атрибута alt
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
  openPopup(popupTypeEdit)
	nameInput.value = profileTitle.textContent
	jobInput.value = profileSubTitle.textContent
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
buttonOpenPopupAddCard.addEventListener('click', () => {openPopup(popupTypeAddCard)});
buttonOpenPopupImage.addEventListener('click', () => {openPopup(popupTypeShowImage)});
popupTypeShowImage.addEventListener('mousedown', closePopupOverlay)
popupTypeAddCard.addEventListener('mousedown', closePopupOverlay)
popupTypeEdit.addEventListener('mousedown', closePopupOverlay)