export default class Popup {
  constructor(popupSelector) {
    // store the DOM element
    this._popup = document.querySelector(popupSelector);
  }

  setEventListeners() {
    this._popup.addEventListener("click", (e) => {
      console.log("Click detected on popup");
      if (
        e.target.classList.contains("modal__close") ||
        e.target.classList.contains("modal_opened")
      ) {
        console.log("Close condition met");
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", (e) => this._handleEscClose(e));
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
