export default class Card {
  constructor(
    item,
    {myId},
    cardSelector,
    { handleCardClick, handleCardDelete, handleAddlike, handleDeletelike }
  ) {
    this._item = item
    this._myId = myId

    this._link = item.link;
    this._name = item.name;
    this._like = item.likes;
    this._id = item._id;
    this._owner = item.owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleAddlike = handleAddlike;
    this._handleDeletelike = handleDeletelike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url('${this._link}')`;
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.id = this._id;
    this._elementLike = this._element.querySelector(".card__icon");
    
    this._element.querySelector('.card__like').textContent = `${this._item.likes.length}`;


    if (this._item.likes.find((like) => like._id === this._myId)) {
      this._elementLike.classList.add('card__icon_active');
    };

    if (this._item.owner._id === this._myId) {
      this._element.querySelector('.card__delete').classList.add('card__delete_active')
    } else {
      this._element.querySelector('.card__delete').classList.remove('card__delete_active')
      // debugger
    };
    this._setEventListeners();
    return this._element;
  }



  handleDelete() {
    this._element.remove();
    this._element = null;
  }

  addLike() {
    const likes = this._element.querySelector('.card__icon');
    likes.classList.toggle('card__icon_active');
  }

  counterShowLikes(arr) {
    const counterLike = this._element.querySelector(".card__like");
    counterLike.textContent = arr.length;
  }


  _showLikes() {
    const like = this._element.querySelector(".card__icon");
    !like.classList.contains("card__icon_active")
      ? this._handleAddlike()
      : this._handleDeletelike();
  }

    _setEventListeners() {
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleCardDelete(this._element);
      });
    this._elementLike.addEventListener("click", () => {
      this._showLikes();
    });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
}
