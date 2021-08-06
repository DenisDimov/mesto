import "./index.css";

// import { initialCards } from "../components/initial-сards.js";
import { config } from "../components/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

const popupCardValid = document.querySelector(".form_type_card");
const popupProfileValid = document.querySelector(".form_type_edit");
const popupAvatarValid = document.querySelector(".form_type_avatar");
const buttonOpenPopupEdit = document.querySelector(".profile__btn");
const buttonOpenPopupAddCard = document.querySelector(".profile__add-card");
const nameInput = document.querySelector(".form__name");
const jobInput = document.querySelector(".form__job");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const inputFormLink = document.querySelector(".form__link");
const inputFormTitle = document.querySelector(".form__place");
const buttonAddcard = document.querySelector(".popup__button");
const avatarEdit = document.querySelector(".profile__avatar-edit");
const avatarImage = document.querySelector(".profile__avatar");
const avatarId = document.querySelector(".popup__avatar");
const profileBtn = document.querySelector('#profile-btn')
const avatarBtn = document.querySelector('#avatar-btn')
const newCardBtn = document.querySelector('#form-addBtn')

let userDataInfo;
let sectionCard;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: "8e37e821-e67f-473b-8051-550ef708d095",
    "Content-Type": "application/json",
  },
});

// получение с сервера карточек и заполнение профиля
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userDataInfo = userData;
    const userInfo = new UserInfo(profileTitle, profileSubTitle);
    userInfo.setUserInfo(userData.name, userData.about);
    avatarImage.src = userData.avatar;
    sectionCard = new Section(".card", {
      items: initialCards,
      renderer: (cardItem) => {
        const addCard = createCard(cardItem);
        sectionCard.addItem(addCard);
      },
    });
    sectionCard.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const formValidatorCard = new FormValidator(popupCardValid, config);
formValidatorCard.enableValidation();

const formValidatorProfile = new FormValidator(popupProfileValid, config);
formValidatorProfile.enableValidation();

const formValidatorAvatar = new FormValidator(popupAvatarValid, config);
formValidatorAvatar.enableValidation();

const popupImage = new PopupWithImage(".popup_type_image");

const userInfo = new UserInfo(profileTitle, profileSubTitle);

const popupProfile = new PopupWithForm(".popup_type_edit", {
  handleFormSubmit: (data) => {
    popupProfile.renderLoading(true, profileBtn)
    api.setUserInfo(data.name, data.job)
    .then(() => {
      userInfo.setUserInfo(data.name, data.job);
    })
    .finally(() => {
      popupProfile.renderLoading(false, profileBtn)
    });
  },
});

const popupAvatar = new PopupWithForm(".popup_type_avatar", {
  handleFormSubmit: () => {
popupAvatar.renderLoading(true, avatarBtn)
    api.setNewAvatar(avatarId.value)
    .then(() => {
      avatarImage.setAttribute("src", avatarId.value);
      avatarId.value = "";
    })
    .finally(() => {
      popupAvatar.renderLoading(false, avatarBtn)
    })
  },
});

// общая функция создания карточек
function createCard(item) {
  const card = new Card(item, {myId: userDataInfo._id}, ".card-template", {
    handleCardClick: () => {
      popupImage.open(item);
      inputFormLink.value = "";
      inputFormTitle.value = "";
    },
    handleCardDelete: () => {
      const popupWithSubmit = new PopupWithSubmit(".popup_type_delete", {
        submitDelete: () => {
          card.handleDelete();
          api.deleteCard(item._id);
          popupWithSubmit.close()
        },
      });
      popupWithSubmit.open()
      // debugger
      popupWithSubmit.setEventListeners()
    },
    handleAddlike: () => {
      api.setLike(item._id)
      .then((data) => {
        card.counterShowLikes(data.likes)
        card.addLike()
      });
    },
    handleDeletelike: () => {
      api.deleteLike(item._id)
      .then((data) => {
        card.counterShowLikes(data.likes)
        card.addLike()
      })
    }
  });
  return card.generateCard(item);
}

// добавление карточек на сервер
const popupCard = new PopupWithForm(".popup_type_new-card", {
  handleFormSubmit: ({ place, Link }) => {
  popupCard.renderLoading(true, newCardBtn)
    api.addCard({ place, Link })
    .then(() => {
      const addCard = createCard({ name: place, link: Link });
      sectionCard.addItem(addCard, false);
    })
    .finally(() => {
      popupCard.renderLoading(true, newCardBtn)
    })
    inputFormLink.value = "";
    inputFormTitle.value = "";
    buttonAddcard.setAttribute("disabled", "disabled");
    buttonAddcard.classList.add("form__submit_inactive");
  },
});

buttonOpenPopupEdit.addEventListener("click", () => {
  nameInput.value = userInfo.getUserInfo().Name;
  jobInput.value = userInfo.getUserInfo().Job;
  formValidatorProfile.clearErrors();
  popupProfile.open();
});

buttonOpenPopupAddCard.addEventListener("click", () => {
  formValidatorCard.clearErrors();
  popupCard.open();
});

avatarEdit.addEventListener("click", () => {
  formValidatorAvatar.clearErrors();
  popupAvatar.open();
});

popupAvatar.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();

