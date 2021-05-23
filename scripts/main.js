let openPopup = document.querySelector('.profile__btn');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('#form-name');
let jobInput = document.querySelector('#form-job');
let profileTitle = document.querySelector('.profile__title')
let profileSubTitle = document.querySelector('.profile__subtitle')

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

formElement.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener('click', openPopups);
closePopup.addEventListener('click', closePopups);
