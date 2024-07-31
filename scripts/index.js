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

/* Elements */
//Wrapppers
const profileEditModal = document.querySelector("#profile-edit-modal");
const galleryEditModal = document.querySelector("#gallery-add-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const galleryEl = document.querySelector("#gallery-cards");
const galleryCardTemplate = document.querySelector("#gallery-card-template")
  .content.firstElementChild;
const profileEditForm = profileEditModal.querySelector(".modal__form");
const galleryEditForm = galleryEditModal.querySelector(".modal__form");

// Buttons and DOM Nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const galleryAddButton = document.querySelector("#gallery-add-button");
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

const galleryTitleInput = galleryEditForm.querySelector("#gallery-title-input");
const galleryUrlInput = galleryEditForm.querySelector("#gallery-url-input");

/* Functions */
// Modals
function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Gallery Cards
function renderCard(cardData, wrapper) {
  const galleryCardElement = getCardElement(cardData);
  wrapper.prepend(galleryCardElement);
}

function getCardElement(galleryCardData) {
  const galleryCardElement = galleryCardTemplate.cloneNode(true);
  const galleryCardImageEl =
    galleryCardElement.querySelector(".gallery__image");
  const galleryCardTextEl = galleryCardElement.querySelector(".gallery__text");
  const likeButton = galleryCardElement.querySelector(".gallery__like-button");
  const deleteButton = galleryCardElement.querySelector(
    ".gallery__delete-button"
  );

  galleryCardImageEl.addEventListener("click", () => {
    openModal(previewImageModal);
    previewImage.src = galleryCardData.link;
    previewImage.alt = galleryCardData.name;
    previewText.textContent = galleryCardData.name;
  });

  deleteButton.addEventListener("click", () => {
    galleryCardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("gallery__like-button_active");
  });

  galleryCardImageEl.src = galleryCardData.link;
  galleryCardImageEl.alt = galleryCardData.name;
  galleryCardTextEl.textContent = galleryCardData.name;

  return galleryCardElement;
}

/* Event Handlers */
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleGalleryEditSubmit(evt) {
  evt.preventDefault();
  const name = galleryTitleInput.value;
  const link = galleryUrlInput.value;
  renderCard({ name, link }, galleryEl);
  closeModal(galleryEditModal);
  evt.target.reset();
}

/* Form Listeners */

// Profile
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Gallery
galleryAddButton.addEventListener("click", () => openModal(galleryEditModal));

galleryEditForm.addEventListener("submit", handleGalleryEditSubmit);

initialCards.forEach((galleryCardData) =>
  renderCard(galleryCardData, galleryEl)
);

// All close buttons

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});
