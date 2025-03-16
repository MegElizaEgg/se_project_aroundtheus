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

const checkInputValidity = (formEl, inputEl, options) => {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
};

const hasInvalidInput = (inputList) => {
  return !inputList.every((inputEl) => inputEl.validity.valid);
};

// should have two more functions, to consolidate the code inside toggleButtonState
// disableButton - add the class that has disabled attribute
// enableButton - remove it as well

const toggleButtonState = (inputList, submitBtn, { inactiveButtonClass }) => {
  //if there's one invalid input, disable the button
  //else, make sure the button is enabled

  //

  if (hasInvalidInput(inputList)) {
    submitBtn.classList.add(inactiveButtonClass);
    submitBtn.disabled = true;
    return;
  }
  submitBtn.classList.remove(inactiveButtonClass);
  submitBtn.disabled = false;
};
// check this in notes - added disabled to the submit button on profile edit modal, and added a secondary css class; doesn't sound like notes

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const { submitButtonSelector } = options;
  const { inactiveButtonClass } = options;
  const inputList = [...formEl.querySelectorAll(inputSelector)];
  const submitBtn = formEl.querySelector(submitButtonSelector);
  toggleButtonState(inputList, submitBtn, { inactiveButtonClass });
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputList, submitBtn, { inactiveButtonClass });
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
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input_type_error_visible",
};

enableValidation(config);
