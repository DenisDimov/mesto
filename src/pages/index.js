import "./index.css";

import { config } from "../utils/constants.js";
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
const avatarEdit = document.querySelector(".profile__avatar-edit");
const avatarImage = document.querySelector(".profile__avatar");

let userDataInfo;
let sectionCard;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: "8e37e821-e67f-473b-8051-550ef708d095",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(profileTitle, profileSubTitle, avatarImage);

// получение с сервера карточек и заполнение профиля
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userDataInfo = userData;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar)
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



const popupProfile = new PopupWithForm(".popup_type_edit", {
  handleFormSubmit: (data) => {
    popupProfile.renderLoading(true)
    api.setUserInfo(data.name, data.job)
    .then(() => {
      userInfo.setUserInfo(data.name, data.job);
      popupProfile.close()
    })
    .catch((err) => {
      console.log((err))
    })
    .finally(() => {
      popupProfile.renderLoading(false)
    });
  },
});

const popupWithSubmit = new PopupWithSubmit(".popup_type_delete")


const popupAvatar = new PopupWithForm(".popup_type_avatar", {
  handleFormSubmit: (data) => {
popupAvatar.renderLoading(true)
    api.setNewAvatar(data.avatar)
    .then(() => {
      // debugger
      userInfo.setAvatar(data.avatar)
      popupAvatar.close()
    })
    .catch((err) => {
      console.log((err))
    })
    .finally(() => {
      popupAvatar.renderLoading(false)
    })
  },
});

// общая функция создания карточек
function createCard(item) {
  const card = new Card(item, {myId: userDataInfo._id}, ".card-template", {
    handleCardClick: () => {
      popupImage.open(item);
    },
    handleCardDelete: () => {
      popupWithSubmit.open()
      popupWithSubmit.setHandleSubmit(() => {
        api.deleteCard(item._id)
        .then(() => {
          card.handleDelete()
          popupWithSubmit.close()
        })
        .catch((err) => {
          console.log(err)
        })
      })
    },
    handleAddlike: () => {
      api.setLike(item._id)
      .then((data) => {
        card.counterShowLikes(data.likes)
        card.addLike()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    handleDeletelike: () => {
      api.deleteLike(item._id)
      .then((data) => {
        card.counterShowLikes(data.likes)
        card.addLike()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  });
  return card.generateCard();
}

// добавление карточек на сервер
const popupCard = new PopupWithForm(".popup_type_new-card", {
  handleFormSubmit: ({ place, Link }) => {
  popupCard.renderLoading(true)
    api.addCard({ place, Link })
    .then((data) => {
      const addCard = createCard(data);
      sectionCard.addItem(addCard, false);
      popupCard.close()
    })
    .catch((err) => {
      console.log((err))
    })
    .finally(() => {
      popupCard.renderLoading(false)
    })
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
popupWithSubmit.setEventListeners()