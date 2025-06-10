import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    // open, close and esc listeners
    this._handleFormSubmit = handleFormSubmit;
    // callback function

    this._submitBtn = this._popup
      .querySelector(".modal__form")
      .querySelector(".modal__submit");
    // currently finds and updates every modal button, not specific to this._popup?
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this.instance, this.id);
      // in callback, retrieves input stored as formValues + cardId for API + cardInstance for DOM
      this._popup.querySelector(".modal__form").reset();
    });
    super.setEventListeners();
  }

  open(instanceOpt = null, idOpt = null) {
    this.instance = instanceOpt;
    this.id = idOpt;
    super.open();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = "Saving...";
    } else {
      this._submitBtn.textContent = "Save";
    }
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".modal__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
}
