export default class Card {
  constructor(
    data,
    cardSelector,
    handlePreviewImage,
    prepareDelete,
    apiInstance
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
    this._prepareDelete = prepareDelete;
    this._api = apiInstance;
  }

  // Listeners
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._prepareDelete(this);
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

  _toggleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // Handlers
  handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleLikeIcon() {
    if (this._likeButton.classList.contains("card__like-button_active")) {
      this._api
        .deleteLikeApi(this._cardId)
        .then(() => {
          this._toggleLikeIcon();
        })
        .catch((err) => {
          return Promise.reject(`${err}`);
        });
    } else {
      this._api
        .addLikeApi(this._cardId)
        .then(() => {
          this._toggleLikeIcon();
        })
        .catch((err) => {
          return Promise.reject(`${err}`);
        });
    }
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
