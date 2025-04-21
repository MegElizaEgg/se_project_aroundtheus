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

// const cardData {
//   name: "Yosemite Valley",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
// }

// const card = new Card(cardData);

/* Elements */
//Wrapppers

const previewImageModal = document.querySelector("#preview-image-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const cardEditModal = document.querySelector("#card-edit-modal");
const profileEditForm = document.forms["profile-edit-form"];
const cardEditForm = document.forms["card-edit-form"];
const cardEl = document.querySelector("#card-section-wrapper");
const cardTemplate = document.querySelector("#card-instance-template").content
  .firstElementChild;

// Buttons and DOM Nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const cardEditButton = document.querySelector("#card-edit-button");
const closeButtons = document.querySelectorAll(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewText = previewImageModal.querySelector(".modal__text");

//Form data
const profileTitleInput = profileEditForm.querySelector("#profile-title-input");
const profileDescriptionInput = profileEditForm.querySelector(
  "#profile-description-input"
);

const cardTitleInput = cardEditForm.querySelector("#card-title-input");
const cardUrlInput = cardEditForm.querySelector("#card-url-input");

/* Functions */

// Modals
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

// (Gallery) Cards

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTextEl = cardElement.querySelector(".card__text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.addEventListener("click", () => {
    openModal(previewImageModal);
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewText.textContent = cardData.name;
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTextEl.textContent = cardData.name;

  return cardElement;
}

/* Event Handlers */

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleCardEditSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardEl);
  closeModal(cardEditModal);
  evt.target.reset();
  disableButton(
    [cardTitleInput, cardUrlInput],
    evt.submitter,
    config.inactiveButtonClass
  );
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

/* Form Listeners */
// Profile
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// (Gallery)
cardEditButton.addEventListener("click", () => openModal(cardEditModal));
cardEditForm.addEventListener("submit", handleCardEditSubmit);
initialCards.forEach((cardData) => renderCard(cardData, cardEl));

// All close buttons

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});
