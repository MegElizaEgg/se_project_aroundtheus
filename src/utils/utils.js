// Other code, such as the array of initial cards and any configuration objects you are using, should be moved to a separate utils/constants.js file and imported into index.js.

export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_inactive",
  inputErrorClass: "modal__error",
  errorClass: "modal__error_visible",
};

//SECTION - Variables

//Wrappers
export const profileEditForm = document.forms["profile-edit-form"];
export const cardEditForm = document.forms["card-edit-form"];

// Buttons and DOM Nodes
export const profileEditButton = document.querySelector("#profile-edit-button");
export const cardEditButton = document.querySelector("#card-edit-button");
export const profileTitleInput = profileEditForm.querySelector(
  "#profile-title-input"
);
export const profileDescriptionInput = profileEditForm.querySelector(
  "#profile-description-input"
);
