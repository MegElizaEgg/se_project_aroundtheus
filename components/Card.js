export default class Card {
  constructor(data, cardSelector, handlePreviewImage) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
  }

  //SECTION - Private Methods

  // Listeners
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._cardImage.addEventListener("click", () => {
      this._handlePreviewImage(this._cardElement);
    });
  }

  // DOM Methods
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  // Handlers
  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  //SECTION - Public Methods

  // UI Methods
  generateCard() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__text").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
