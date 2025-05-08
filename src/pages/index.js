// video sections: import css, import all classes, create instances of classes, initialize all instances, all the rest
//SECTION - Imports

// Webpack

// Classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Constants
import { initialCards, validationSettings } from "../utils/constants.js";

//SECTION - Elements
// video suggestion: move all consts to the constants.js into an object?

//Wrappers
const profileEditForm = document.forms["profile-edit-form"];
const cardEditForm = document.forms["card-edit-form"];

// Buttons and DOM Nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const cardEditButton = document.querySelector("#card-edit-button");
const profileTitleInput = profileEditForm.querySelector("#profile-title-input");
const profileDescriptionInput = profileEditForm.querySelector(
  "#profile-description-input"
);

//SECTION - Setup

// Initializations
const profileUser = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        "#card-instance-template",
        handlePreviewImage
      );
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  "#card-section-wrapper"
);
cardsList.renderItems();

const profileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const cardFormValidator = new FormValidator(validationSettings, cardEditForm);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

const previewImageModal = new PopupWithImage("#preview-image-modal");

previewImageModal.setEventListeners();

const profileEditModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formValues) => {
    profileUser.setUserInfo({
      name: formValues.profileTitle,
      description: formValues.profileDescription,
    });
    profileEditModal.close();
  },
});

profileEditModal.setEventListeners();

const cardEditModal = new PopupWithForm({
  popupSelector: "#card-edit-modal",
  handleFormSubmit: (formValues) => {
    const card = new Card(
      {
        name: formValues.cardTitle,
        link: formValues.imageUrl,
      },
      "#card-instance-template",
      handlePreviewImage
    );
    cardsList.addItem(card.generateCard());
    cardFormValidator.handleResetValidation(true);
    cardEditModal.close();
  },
});

cardEditModal.setEventListeners();

// Listeners
profileEditButton.addEventListener("click", () => {
  profileFormValidator.handleResetValidation(false);
  ({
    name: profileTitleInput.value,
    description: profileDescriptionInput.value,
  } = profileUser.getUserInfo());
  profileEditModal.open();
});

cardEditButton.addEventListener("click", () => {
  cardEditModal.open();
});

//SECTION - Handlers

function handlePreviewImage(cardElement) {
  const name = cardElement.querySelector(".card__text").textContent;
  const link = cardElement.querySelector(".card__image").src;
  previewImageModal.open({ name, link });
}
