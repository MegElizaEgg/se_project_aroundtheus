// to render to the DOM

export default class UserInfo {
  constructor(userObj) {
    this._userObj = userObj;
    // holds DOM node references; is passed userNodes for formInputs and current user info on page
    this._profileId = null;
  }

  _getCurrentUser() {
    // return an object of currently displayed user - to give to associated form

    return {
      name: this._userObj.curName.textContent,
      about: this._userObj.curAbout.textContent,
      avatar: this._userObj.curAvatar.src, // is this src?
    };
  }

  // inputVals can be formValues or apiRes
  // to update DOM from form input or API result; returns a user object
  setCurrentUser(inputVals) {
    let avatarVal = inputVals.avatar || inputVals.avatarInput;
    let nameVal = inputVals.name || inputVals.nameInput;
    let aboutVal = inputVals.about || inputVals.aboutInput;
    let idVal = inputVals._id;

    if (avatarVal) {
      this._userObj.curAvatar.src = avatarVal;
    }
    if (nameVal) {
      this._userObj.curName.textContent = nameVal;
    }
    if (aboutVal) {
      this._userObj.curAbout.textContent = aboutVal;
    }
    if (idVal) this._profileId = idVal;

    return {
      avatar: avatarVal,
      name: nameVal,
      about: aboutVal,
      _id: idVal,
    };
  }

  // takes current user object and fills form inputs, called in profiledEditButton event listener
  fillUserForm() {
    const formVals = this._getCurrentUser();
    this._userObj.nameInput.value = `${formVals.name}`;
    this._userObj.aboutInput.value = `${formVals.about}`;
  }
}
