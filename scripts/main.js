// const initialCards = [
//   {
//     name: 'Архыз',
//     link: './image/elements/1.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: '../image/elements/2.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: './image/elements/3.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: '../image/elements/4.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: '../image/elements/5.jpg'
//   },
//   {
//     name: 'Кот',
//     link: '../image/elements/6.jpg'
//   }
// ];

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const openPopup = document.querySelector('.profile__btn');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('#form-name');
const jobInput = document.querySelector('#form-job');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const openNewCard = document.querySelector('.profile__add-card');
const AddNewCard = document.querySelector('.popup_type_new-card');
const closeCard = document.querySelector('.popup__close_add_card');
const formSubmit = document.querySelector('.form__add-card')
const addCard = document.querySelector('.card');
const itemTemplate = document.querySelector('.card__template').content
const formLink = document.querySelector('#form-link')
const formTitle = document.querySelector('#form-place')
const popupShowImage = document.querySelector('.popup_type_image')
const popupOpenImage = document.querySelector('.popup__image')
const popupCloseImage = document.querySelector('#popup__close')
const popupTitle = document.querySelector('.popup__image-title')

function renderItem() {
	initialCards.forEach(createCards)
}

function createCards(item) {
	const userElement = itemTemplate.cloneNode(true);

  userElement.querySelector('.card__image').style.backgroundImage = `url('${item.link}')`
	userElement.querySelector('.card__title').textContent = item.name
  setEventListeners(userElement);
	addCard.prepend(userElement);
}

// добавление карточек на страницу

function HandlerAddCard(evt) {
  evt.preventDefault()

  const formItemTitle = formTitle.value
  const formItemLink = formLink.value

  const item = {
    name: formItemTitle,
    link: formItemLink
}
  createCards(item)
  formSubmit.reset()
  toggleNewCard()
}
// удаление карточки

function handleDelete(evt) {
  evt.target.closest('.card__item').remove();
}

function handleShowImage (evt) {
  
  popupOpenImage.style.backgroundImage = evt.target.style.backgroundImage
  popupTitle.textContent = evt.target.closest('.card__item').textContent
  togglePopupImage()
}

function togglePopupImage() {
  popupShowImage.classList.toggle('popup_opened')
}


function setEventListeners(element) {
  element.querySelector('.card__delete').addEventListener('click', handleDelete);
  element.querySelector('.card__icon').addEventListener('click', handleLikes);
  element.querySelector('.card__image').addEventListener('click', handleShowImage);
  element.querySelector('.card__title').closest('.card__item');
}

// лайк карточки

function handleLikes(evt) {
  evt.target.classList.toggle('card__icon_active')
}

// открытие попапа добавления карточки
function toggleNewCard() {
  AddNewCard.classList.toggle('popup_opened')
}

// функции открытия попапа
function openPopups() {
	popup.classList.add('popup_opened');

	nameInput.value = profileTitle.textContent
	jobInput.value = profileSubTitle.textContent
};

// функция ввода данных в поля
function formSubmitHandler (evt) {
	evt.preventDefault();

	profileTitle.textContent = nameInput.value;
	profileSubTitle.textContent = jobInput.value;

	closePopups();
};

// функция закрытия попапа
function closePopups() {
	popup.classList.remove('popup_opened');
};

renderItem()

// отправка форм
formSubmit.addEventListener('submit', HandlerAddCard);
formElement.addEventListener('submit', formSubmitHandler);
// открытие/закрытие попапа с именем
openPopup.addEventListener('click', openPopups);
closePopup.addEventListener('click', closePopups);
// открытие/закрытие попапа с карточками
openNewCard.addEventListener('click', toggleNewCard);
closeCard.addEventListener('click', toggleNewCard);
popupOpenImage.addEventListener('click', togglePopupImage);
popupCloseImage.addEventListener('click', togglePopupImage);