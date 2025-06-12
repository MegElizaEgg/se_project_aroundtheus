// Other code, such as the array of initial cards and any configuration objects you are using, should be moved to a separate utils/constants.js file and imported into index.js.

// credit https://avatar-placeholder.iran.liara.run/avatars/female

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
export const avatarEditForm = document.forms["avatarEditForm"];
export const profileEditForm = document.forms["profileEditForm"];
export const cardEditForm = document.forms["cardEditForm"];
export const cardDeleteForm = document.forms["cardDeleteForm"];

// Buttons and DOM Nodes
export const avatarEditButton = document.querySelector(
  "#profile-image-edit-button"
);
export const profileEditButton = document.querySelector("#profile-edit-button");
export const cardEditButton = document.querySelector("#card-edit-button");
export const cardDeleteButtons = document.querySelectorAll(
  "#card-delete-button"
);

export const userNodes = {
  // collects DOM Nodes for Profile Section (+ _id)
  nameInput: profileEditForm.querySelector("#nameInput"),
  aboutInput: profileEditForm.querySelector("#aboutInput"),
  avatarInput: avatarEditForm.querySelector("#avatarInput"),
  curAvatar: document.querySelector(".profile__image-pic"),
  curName: document.querySelector(".profile__title"),
  curAbout: document.querySelector(".profile__about"),
};
