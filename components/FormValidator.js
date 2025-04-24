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

  //SECTION - Listeners
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(formEl, inputEl, settings);
        this._toggleButtonState();
      });
    });
  }

  //SECTION - Handlers

  _enableButton() {
    if (this._hasValidInput([...this._inputList])) {
      this._submitBtn.classList.remove(this._inactiveButtonClass);
      this._submitBtn.disabled = false;
    }
  }

  _disableButton() {
    if (!this._hasValidInput(this._inputList)) {
      this._submitBtn.classList.add(this._inactiveButtonClass);
      this._submitBtn.disabled = true;
      return;
    }
  }

  _showInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    errorEl.textContent = inputEl.validationMessage;
    errorEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError();
    }
    this._hideInputError();
  }

  _hasValidInput() {
    return this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (!this._hasValidInput(this._inputList)) {
      this._disableButton();
      return;
    }
    this._enableButton();
  }

  //SECTION - Public Methods for Validation

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }

  handleValidSubmit(button, shouldResetFields) {
    this._submitBtn = button;
    this._disableButton();
    if (shouldResetFields === true) {
      this._inputList.forEach((inputEl) => {
        inputEl.value = "";
        this.resetValidation();
      });
    }
  }
}
