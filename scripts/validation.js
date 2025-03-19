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

function disableButton(inputList, submitBtn, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    submitBtn.classList.add(inactiveButtonClass);
    submitBtn.disabled = true;
    return;
  }
}

function enableButton(inputList, submitBtn, inactiveButtonClass) {
  if (!hasInvalidInput([...inputList])) {
    submitBtn.classList.remove(inactiveButtonClass);
    submitBtn.disabled = false;
  }
}

export const toggleButtonState = (
  inputList,
  submitBtn,
  { inactiveButtonClass }
) => {
  if (hasInvalidInput(inputList)) {
    disableButton(inputList, submitBtn, inactiveButtonClass);
    return;
  }
  enableButton(inputList, submitBtn, inactiveButtonClass);
};

function setEventListeners(formEl, options) {
  const { inputSelector, inactiveButtonClass, submitButtonSelector } = options;
  const inputList = [...formEl.querySelectorAll(inputSelector)];
  const submitBtn = formEl.querySelector(submitButtonSelector);
  toggleButtonState(inputList, submitBtn, { inactiveButtonClass }); //submit inactive when modal opens
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputList, submitBtn, { inactiveButtonClass }); //submit inactive after inputs unless they are valid
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
  });
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_inactive",
  inputErrorClass: "modal__error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
