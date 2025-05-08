import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popup.querySelector(".modal__image");
    this._previewText = this._popup.querySelector(".modal__text");
  }

  open({ name, link }) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewText.textContent = name;
    super.open();
  }
}
