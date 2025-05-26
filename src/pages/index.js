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
// import Api from "../utils/Api.js;"

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

const renderCard = (item) => {
  const card = new Card(item, "#card-instance-template", handlePreviewImage);
  cardsList.addItem(card.generateCard());
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  "#card-section-wrapper"
);

const formValidators = {};

const anyFormValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formEl) => {
    const validator = new FormValidator(settings, formEl);
    const formName = formEl.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

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
    renderCard({
      name: formValues.cardTitle,
      link: formValues.imageUrl,
    });
    formValidators[cardEditForm.getAttribute("name")].handleResetValidation(
      true
    );
    cardEditModal.close();
  },
});

// Initializations
anyFormValidation(validationSettings);
cardsList.renderItems();
formValidators[profileEditForm.getAttribute("name")].enableValidation();
formValidators[cardEditForm.getAttribute("name")].enableValidation();

//SECTION - Listeners

previewImageModal.setEventListeners();
profileEditModal.setEventListeners();
cardEditModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  formValidators[profileEditForm.getAttribute("name")].handleResetValidation(
    false
  );
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
