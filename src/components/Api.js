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
          return Promise.reject(`Error: ${res.status}`);
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
}
