let openPopup = document.querySelector('.profile__btn');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__name');
let jobInput = document.querySelector('.form__job');


function togglePopups() {
	popup.classList.toggle('popup__opened');
};

function formSubmitHandler (evt) {
	evt.preventDefault(); 

	nameInput = document.querySelector('.form__name').value;
	jobInput = document.querySelector('.form__job').value;

	document.querySelector('.profile__title');
	document.querySelector('.profile__subtitle');

	document.querySelector('.profile__title').textContent = nameInput;
	document.querySelector('.profile__subtitle').textContent = jobInput;

	togglePopups();
};

formElement.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener('click', togglePopups);
closePopup.addEventListener('click', togglePopups);
