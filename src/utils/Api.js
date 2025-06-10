//ANCHOR - THIS SHOULD ONLY HANDLE THE API - the handling of responses needs to be in index.js
//NOTE - Remember, in .this(), (usually in the script pages where you are calling it once the API has returned), it is best to use a callback method inside of it, rather than running the method right away

//TODO - verify if popupwithform is correct class (since just button), connect popup to trash cans

//TODO - style edit profile pic popup, connect popup to edit pencil (#8)

//TODO - Make sure ALL the above interacts correctly with the index.js

//TODO - adjust all 1s transitions CSS to 0.3s

export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res, methodString) {
    if (!res.ok) {
      return res.json().then((res) => {
        if (methodString === "POST") {
          console.error("Full error response:", res);
          return Promise.reject(`Error: ${res.message}`);
        }
        if (methodString === "PATCH") {
          console.error("Full error response:", res);
          return Promise.reject(
            `Error: ${res.errors[Object.keys(res.errors)[0]].message}`
          );
        } else {
          console.error("Full error response:", res);
          return Promise.reject(`Error: ${res}`);
        }
      });
    } else {
      return res.json();
    }
  }

  apiPromiseAll() {
    return Promise.all([this.getUserApi(), this.getInitialCards()])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
        alert("Sorry, something went wrong.");
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res, "GET");
    });
  }

  getUserApi() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res, "GET");
    });
  }

  editUserApi(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkResponse(res, "PATCH");
    });
  }

  editAvatarApi(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._checkResponse(res, "PATCH");
    });
  }

  addCardApi(cardTitle, imageURL) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardTitle,
        link: imageURL,
      }),
    }).then((res) => {
      return this._checkResponse(res, "POST");
    });
  }

  deleteCardApi(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res, "DELETE");
    });
  }

  addLikeApi(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res, "PUT");
    });
  }

  deleteLikeApi(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res, "DELETE");
    });
  }

  //TODO - 9. Improve UX of all forms
  // When editing a profile, you will notify the user that the upload process is underway by changing the button text to be "Saving...". This should be shown until the data has finished uploading:
  // Do the same thing for the forms used to add new cards and for the form used to update the user's profile picture.
}
