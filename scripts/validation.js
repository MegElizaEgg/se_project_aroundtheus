const showInputError = (formEl, inputEl, { errorClass }) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorEl.textContent = inputEl.validationMessage;
  errorEl.classList.add(errorClass);
};

const hideInputError = (formEl, inputEl, { errorClass }) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
};

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
    });
  });
}

const enableValidation = (options) => {
  const formEls = [...document.querySelectorAll(options.formSelector)];

  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
    // >> enable button
    // >> reset error messages
  });
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input_type_error_visible",
};

enableValidation(config);
