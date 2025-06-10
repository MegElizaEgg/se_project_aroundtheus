import { cardDeleteModal, cardDeleteForm } from "../utils/utils";
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

  //SECTION - Private Methods

  // Listeners

  //TODO - on the new form modals
  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._prepareDelete(this);
      // `this` passes WHICH card is used as `cardInstance`:
      // extracts the id for API and sends the full instance to modal
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

  //TODO - fix deleteCard in API
  handleDeleteCard() {
    this._cardElement.remove();
  }

  //REVIEW - should this include isLiked T/F from API instead?
  _handleLikeIcon() {
    if (this._likeButton.classList.contains("card__like-button_active")) {
      this._api
        .deleteLike(this._cardId)
        .then(
          () => {
            this._toggleLikeIcon();
          }
          // do I do anything with the result here?
        )
        .catch((err) => {
          return Promise.reject(`${err}`);
        });
    } else {
      this._api
        .addLike(this._cardId)
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
