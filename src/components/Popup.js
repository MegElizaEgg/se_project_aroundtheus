export default class Popup {
  constructor(popupSelector) {
    // store the DOM element
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  setEventListeners() {
    this._popup.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal__close") ||
        e.target.classList.contains("modal_opened")
      ) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
