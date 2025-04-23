export default class Card {
  // card with text and image link
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  //SECTION private methods for working with markup and adding event listeners,

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    const cardImage = this._cardElement.querySelector(".card__image");

    deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    cardImage.addEventListener("click", () => {
      this._handleImageClick(this._cardElement);
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__text").textContent = this._name;
    return this._cardElement;
  }
}

//TODO fct that handles the opening of preview picture modal
//REVIEW 63 openModal (adds opened property to ANY modal); 103 event listener to preview clicked image
// (should already have elsewehere, maybe with different name or might be anonymous)

//TODO follow tasks on 7.044-45 to change openModal and closeModal: this._etc
