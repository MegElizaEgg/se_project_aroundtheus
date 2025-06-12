export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formEl = formEl;

    this._inputList = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitBtn = this._formEl.querySelector(this._submitButtonSelector);
  }

  //Listeners
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  // UI Manipulation
  _toggleButtonState() {
    if (!this._hasValidInput(this._inputList)) {
      this._disableButton();
      return;
    }
    this._enableButton();
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _enableButton() {
    if (this._hasValidInput([...this._inputList])) {
      this._submitBtn.classList.remove(this._inactiveButtonClass);
      this._submitBtn.disabled = false;
    }
  }

  _disableButton() {
    this._submitBtn.classList.add(this._inactiveButtonClass);
    this._submitBtn.disabled = true;
  }

  _showInputError(inputEl) {
    this._errorEl = this._formEl.querySelector(`#${inputEl.id}Error`);
    this._errorEl.textContent = inputEl.validationMessage;
    this._errorEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    this._errorMessageEl = this._formEl.querySelector(`#${inputEl.id}Error`);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }

  // Conditions
  _hasValidInput() {
    return this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  // DOM Manipulation
  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  // Handlers
  handleResetValidation(shouldResetFields) {
    this._disableButton();
    this._toggleButtonState();
    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    if (shouldResetFields === true) {
      this._formEl.reset();
    }
  }
}
