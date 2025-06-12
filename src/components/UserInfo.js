// to render to the DOM

export default class UserInfo {
  constructor(userObj) {
    this._userObj = userObj;
    this._profileId = null;
  }

  _getCurrentUser() {
    return {
      name: this._userObj.curName.textContent,
      about: this._userObj.curAbout.textContent,
      avatar: this._userObj.curAvatar.src,
    };
  }

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

  fillUserForm() {
    const formVals = this._getCurrentUser();
    this._userObj.nameInput.value = `${formVals.name}`;
    this._userObj.aboutInput.value = `${formVals.about}`;
  }
}
