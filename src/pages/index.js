// when calling a method on api, you are expecting it to return a promise you can chain .then to
// .then is what you do on the page once the response was successful
//FIXME - TEST ALL - check the like/dislike button on cards

//SECTION - Imports

// Webpack
import "../pages/index.css";

// Classes
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Constants

import {
  validationSettings,
  userNodes,
  avatarEditForm,
  profileEditForm,
  cardEditForm,
  avatarEditButton,
  profileEditButton,
  cardEditButton,
} from "../utils/utils.js";

const formValidators = {};

// Variables
let cardsList;
let profileRender;
let curUserProfile;
let curUserAvatar;

//SECTION - Callbacks

const getPatch = (domValues) => {
  const modalSelector = document.querySelector(".modal_opened");

  const modalKey = modalSelector.id;

  const handlers = {
    profileModal: () => {
      let values = {
        newName: domValues.nameInput,
        newAbout: domValues.aboutInput,
      };

      return pageApi
        .editUserApi(values.newName, values.newAbout)
        .then((res) => {
          return (curUserProfile = res);
        })
        .catch((err) => {
          return Promise.reject(`broken call from index57: ${err}`);
        });
    },

    avatarModal: () => {
      let values = { newAvatar: domValues.avatarInput };

      return pageApi
        .editAvatarApi(values.newAvatar)
        .then((res) => {
          return (curUserAvatar = res);
        })
        .catch((err) => {
          return Promise.reject(`broken call from index70: ${err}`);
        });
    },
  };

  const handler = handlers[modalKey];

  if (!handler) {
    throw new Error(`No handler defined for modal type: ${modalKey}`);
  }
  return handler();
};

const renderCard = (item) => {
  const card = new Card(
    item,
    "#card-instance-template",
    handlePreviewImage,
    prepareDelete,
    pageApi
  );
  const cardInstance = card.generateCard();
  cardsList.addItem(cardInstance);
  return cardInstance;
};

//SECTION - Setup

const pageApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e315e92f-7d1b-43f2-b057-cdca1769e40c",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(userNodes);

pageApi
  .apiPromiseAll()
  .then((res) => {
    let [initialUser, initialCards] = res;
    return { initialUser, initialCards };
  })
  .then((res) => {
    const profileId = userInfo.setCurrentUser(res.initialUser)._id;
    profileRender = res.initialUser;
    userInfo.setCurrentUser(profileRender);
    cardsList = new Section(
      {
        items: res.initialCards,
        renderer: renderCard,
      },
      "#card-section-wrapper"
    );
    cardsList.renderItems();
    return profileId;
  })
  .catch((err) => {
    console.error(err);
    alert(`Server error: ${err}, please try again.`);
    //FIXME - What if several errors?
  });

// Instances?
// Initializations?

const anyFormValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formEl) => {
    const validator = new FormValidator(settings, formEl);
    const formName = formEl.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

anyFormValidation(validationSettings);

formValidators[profileEditForm.getAttribute("name")].enableValidation();
formValidators[cardEditForm.getAttribute("name")].enableValidation();
formValidators[avatarEditForm.getAttribute("name")].enableValidation();

const previewImageModal = new PopupWithImage("#cardDisplayModal");

// code duplication thoughts: both PopupWithForm instances are super similar here, especially in the .then and .catch

const avatarEditModal = new PopupWithForm({
  popupSelector: "#avatarModal",
  handleFormSubmit: (formValues) => {
    avatarEditModal.renderLoading(true);
    getPatch(formValues)
      .then((res) => {
        userInfo.setCurrentUser(res);
        //REVIEW - does this actually update anything in UI?
        formValidators[
          avatarEditForm.getAttribute("name")
        ].handleResetValidation(true);
        avatarEditModal.close();
        avatarEditModal.renderLoading(false);
      })
      .catch((err) => {
        console.error(err);
        avatarEditModal.renderLoading(false);
        return Promise.reject(`${err}`);
      });
  },
});

const profileEditModal = new PopupWithForm({
  popupSelector: "#profileModal",
  handleFormSubmit: (formValues) => {
    profileEditModal.renderLoading(true);
    getPatch(formValues)
      .then((res) => {
        userInfo.setCurrentUser(res);
        formValidators[
          profileEditForm.getAttribute("name")
        ].handleResetValidation(true);
        profileEditModal.close();
        profileEditModal.renderLoading(false);
      })
      .catch((err) => {
        console.error(err);
        profileEditModal.renderLoading(false);
        alert(`${err}`);
      });
  },
});

const cardEditModal = new PopupWithForm({
  popupSelector: "#cardAddModal",
  handleFormSubmit: (formValues) => {
    cardEditModal.renderLoading(true);
    pageApi
      .addCardApi(formValues.cardTitle, formValues.imageUrl)
      .then((res) => {
        renderCard({ name: res.name, link: res.link });
        // pulls 'item' from the res for renderCard, sends to the Card constructor 'data'
        // data should include the properties: name, link, _id
        formValidators[cardEditForm.getAttribute("name")].handleResetValidation(
          true
        );
        cardEditModal.close();
        cardEditModal.renderLoading(false);
      })
      .catch((err) => {
        console.error(err);
        cardEditModal.renderLoading(false);
        alert(`${err}`);
      });
  },
});

const cardDeleteModal = new PopupWithForm({
  popupSelector: "#cardDeleteModal",
  handleFormSubmit: (_, cardInstance, cardId) => {
    // params: 1. formValues (NA), 2. full card instance, 3. extracted _cardId for API

    pageApi
      .deleteCardApi(cardId)
      .then(() => {
        //REVIEW - do i need the res anywhere?
        cardInstance.handleDeleteCard();
        cardDeleteModal.close();
      })
      .catch((err) => {
        console.error(err);
        alert(`${err}`);
      });
  },
});

//SECTION - Listeners

previewImageModal.setEventListeners();
profileEditModal.setEventListeners();
avatarEditModal.setEventListeners();
cardEditModal.setEventListeners();
cardDeleteModal.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  formValidators[avatarEditForm.getAttribute("name")].handleResetValidation(
    true //REVIEW -  I think we should clear the url and the validation, correct?
  );
  avatarEditModal.open();
});

profileEditButton.addEventListener("click", () => {
  userInfo.fillUserForm();
  formValidators[profileEditForm.getAttribute("name")].handleResetValidation(
    false
  );
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

function prepareDelete(cardInstance) {
  const cardId = cardInstance._cardId; // extract for API
  cardDeleteModal.open(cardInstance, cardId); // sends instance and ID to the modal
}
