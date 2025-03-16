console.log("hello from validation js");

// enabling validation by calling enableValidation()
// pass all the settings on call

const showInputError = (formEl, inputEl, { errorClass }) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorEl.textContent = inputEl.validationMessage;
  errorEl.classList.add(errorClass);
  //   inputEl.classList.add(inputErrorClass);
};

const hideInputError = (formEl, inputEl, { errorClass }) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
  //   inputEl.classList.remove(inputErrorClass);
};

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    // remember: runs each time the user has an input;
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
  // by adding the input above, it NEGATES whatever is in the function: saying if it's not true, run this code
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      // go to input element & add error message: showInputError() and checkInputValidity()
      //new function
      checkInputValidity(formEl, inputEl, options); // need the form, the element we're in, & options object
    });
  });
}

const enableValidation = (options) => {
  const formEls = [...document.querySelectorAll(options.formSelector)];

  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options); //second parameter is an object with the class names defined already
    // look for all inputs inside of form : setEventListeners
    // loop through all the inputs to see if all are valid
    // > if input is not valid
    // >> get the validation message
    // >> add error class to input
    // >> display error message
    // >> disable button
    // > if all inputs are valid
    // >> enable button
    // >> reset error messages
  });
};

// note: .modal__form is for ALL FORMS, document.qsa can also call "form", which just calls everything by the form TAG
// tip: to differentiate how you collect things in javascript... can make the form class in html "popup__form js-modal-form"
// video: can wrap const formEls = document.qsa("") in an array by using brackets; to use the spread operator* (...), inside the brackets, before the `document.`
/// expects that whatever is next to it is an array or array like object, grabs what is next to it and makes a copy of it, (works the same way as array.from) [I replaced the array.from with the spread operator]

// want to go to form elements, loop through them and add listener to the form
/// to find the class for what you need, can console.log them? (so cl formEl)
// * find VS code shortcut to enter anonymous function, or arrow function

// 1. add event listener on form element, make sure on submit you prevent default

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input_type_error_visible",
};
// --> do i need to change these object properties & class names to match my project?
// YES! by selecting things via object/variable, it makes our code dry & lowers margin of error for typos

enableValidation(config);

// continue video for button at 1:12:04
