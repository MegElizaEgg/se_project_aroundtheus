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
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditClose = document.querySelector("#profile-edit-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const galleryEl = document.querySelector("#gallery-cards");
const galleryCardTemplate = document.querySelector("#gallery-card-template")
  .content.firstElementChild;

/* Functions */
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(galleryCardData) {
  // clone the template element with all its content and store it in a `cardElement` variable
  const galleryCardElement = galleryCardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const galleryCardImageEl =
    galleryCardElement.querySelector(".gallery__image");
  const galleryCardTextEl = galleryCardElement.querySelector(".gallery__text");
  // set the path to the image to the `link` field of the object
  galleryCardImageEl.src = galleryCardData.link;
  // set the image alt text to the `name` field of the object
  galleryCardImageEl.alt = galleryCardData.name;
  // set the card title to the `name` field of the object, too
  galleryCardTextEl.textContent = galleryCardData.name;
  // return the ready HTML element with the filled-in data
  return galleryCardElement;
}

/* Event Handlers */
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

/* Event Listeners */
//* ! 2/7 create template for adding a card?
//* !2.1 clone modal for name? and add to it per Figma - HTML, CSS & JS

//* !2.2 eventlistener 'click' to open, and 2.3 to close

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileEditClose.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//* ! 1/7 rewrite the for loop with a forEach loop - already done?
initialCards.forEach((galleryCardData) => {
  const galleryCardElement = getCardElement(galleryCardData);
  galleryEl.append(galleryCardElement);
});
