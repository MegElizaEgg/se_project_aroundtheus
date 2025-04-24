import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_inactive",
  inputErrorClass: "modal__error",
  errorClass: "modal__error_visible",
};

//SECTION - Elements

//Wrapppers
const previewImageModal = document.querySelector("#preview-image-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const cardEditModal = document.querySelector("#card-edit-modal");
const profileEditForm = document.forms["profile-edit-form"];
const cardEditForm = document.forms["card-edit-form"];
const cardSection = document.querySelector("#card-section-wrapper");

// Buttons and DOM Nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const cardEditButton = document.querySelector("#card-edit-button");
const closeButtons = document.querySelectorAll(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewText = previewImageModal.querySelector(".modal__text");
const profileTitleInput = profileEditForm.querySelector("#profile-title-input");
const profileDescriptionInput = profileEditForm.querySelector(
  "#profile-description-input"
);
const cardTitleInput = cardEditForm.querySelector("#card-title-input");
const cardUrlInput = cardEditForm.querySelector("#card-url-input");

//SECTION - Initializations & Form Listeners

const profileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const cardFormValidator = new FormValidator(validationSettings, cardEditForm);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
initialCards.forEach((data) => {
  const card = new Card(data, "#card-instance-template", handleImageClick);
  const cardElement = card.generateCard();
  cardSection.append(cardElement);
});
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
  openModal(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardEditButton.addEventListener("click", () => openModal(cardEditModal));
cardEditForm.addEventListener("submit", handleCardEditSubmit);
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

//SECTION - Event Handlers

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", isEscEvent);
  document.addEventListener("click", isClickOutsideEvent);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", isEscEvent);
  document.removeEventListener("click", isClickOutsideEvent);
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  profileFormValidator.handleValidSubmit();
}

function handleCardEditSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const card = new Card(
    { name, link },
    "#card-instance-template",
    handleImageClick
  );
  const cardElement = card.generateCard();
  cardSection.prepend(cardElement);
  closeModal(cardEditModal);
  evt.target.reset();
}

function handleImageClick(cardElement) {
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTextEl = cardElement.querySelector(".card__text");
  openModal(previewImageModal);
  previewImage.src = cardImageEl.src;
  previewImage.alt = cardTextEl.textContent;
  previewText.textContent = cardTextEl.textContent;
}

function isEscEvent(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

function isClickOutsideEvent(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}
