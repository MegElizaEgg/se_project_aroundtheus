//SECTION - Imports

// Webpack
import "../pages/index.css";

// Classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Constants
import {
  initialCards,
  validationSettings,
  profileEditForm,
  cardEditForm,
  profileEditButton,
  cardEditButton,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/utils.js";

//SECTION - Setup

// Instances
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

const profileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const cardFormValidator = new FormValidator(validationSettings, cardEditForm);

const previewImageModal = new PopupWithImage("#preview-image-modal");

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

// Initializations
cardsList.renderItems();
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

//SECTION - Listeners

previewImageModal.setEventListeners();
profileEditModal.setEventListeners();
cardEditModal.setEventListeners();

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
