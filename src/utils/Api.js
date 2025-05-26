// Example how to make request to the project server (this case, /cards); makes sure to use correct auth token
// auth needs to be done with every request: "e315e92f-7d1b-43f2-b057-cdca1769e40c"

//TODO - (see later) style delete popup, verify delete vs submit interaction with popup classes, verify if popupwithform is correct class (since just button), connect popup to trash cans
//TODO - HTML + CSS for the edit profile button per figma (#8)
//TODO - style edit profile pic popup, connect popup to edit pencil (#8)

//TODO - Make sure ALL the above interacts correctly with the index.js

//TODO - adjust all 1s transitions CSS to 0.3s

class Api {
  constructor(options) {}

  getInitialCards() {
    // 2. loading cards from server
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "e315e92f-7d1b-43f2-b057-cdca1769e40c",
      },
    }).then((res) => {
      if (res.ok) {
        // can also use res.status
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
    // initial response will be an empty JSON array []
    // after upload first cards in step 4, array will look like this:
    // [
    //   {
    //     "createdAt": "2023-07-05T08:10:57.741Z",
    //     "isLiked": false,
    //     "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    //     "name": "Yosemite Valley",
    //     "owner": "e20537ed11237f86bbb20ccb",
    //     "_id": "5d1f0611d321eb4bdcd707dd"
    //   },
    //   {
    //     "createdAt": "2023-07-05T08:11:58.324Z",
    //     "isLiked": false,
    //     "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    //     "name": "Lake Louise",
    //     "owner": "e20537ed11237f86bbb20ccb",
    //     "_id": "5d1f064ed321eb4bdcd707de"
    //   }
    // ]
  }
  //TODO - Each card has the name and link properties, which store the title and a link to the picture. These properties will be needed for displaying each card. Also, each card has an ID, stored in the _id property.
  //TODO - Don’t forget to remove the old code for displaying the initial cards.

  // other methods for working with API
  // Recommendations - #5
  // create fctn (here?) and return the Promise.all() method
  // pass array of fctn calls for getting user info and the list of cards to Promise.all() as a parameter

  //ANCHOR - uncertain where the following fetches belong
  getUserInfo() {
    // 1. loading user info from server
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "e315e92f-7d1b-43f2-b057-cdca1769e40c",
      },
    }).then((res) => {
      if (res.ok) {
        // can also use res.status
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
    // should recieve a user object in the response:
    // {
    //   "about": "Placeholder description",
    //   "avatar": "https://practicum-content.s3.amazonaws.com/resources/default-avatar_1704458546.png",
    //   "name": "Placeholder name",
    //   "_id": "e20537ed11237f86bbb20ccb"
    // }
  }
  //TODO - Use the name, about, and avatar properties in the corresponding header elements of the page. The _id property is for the user's ID; in this case yours

  editUserInfo() {
    // 3. Editing the profile
    //TODO - Add Content-Type to the request headers after the authorization token, and JSON with two properties, name and about, to the request body. The values of these properties should contain the modified profile data. Here is an example of such a request:
    fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "e315e92f-7d1b-43f2-b057-cdca1769e40c",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist",
      }),
    });
    // If update successful, will recieve modified profile data in body of server response:
    // {
    // "name": "Marie Skłodowska Curie",
    // "about": "Physicist and Chemist",
    // "avatar": "https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg",
    // "_id": "e20537ed11237f86bbb20ccb"
    // }
  }

  addNewCard() {
    // 4. adding a new card
    fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "e315e92f-7d1b-43f2-b057-cdca1769e40c",
        "Content-Type": "application/json",
        //FIXME - check the above content-type
      },
      body: JSON.stringify({
        name: "", // name of the created card
        link: "", // link to the image
      }),
    });
    // If successful, server will return response with object of the new card:
    // {
    //   "isLiked": false,
    //   "_id": "64a55f2a91758c001af2a1bd",
    //   "name": "Bald Mountains",
    //   "link": "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    //   "owner": {
    //     "about": "Sailor, researcher",
    //     "avatar": "https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg",
    //     "name": "Jacques Cousteau",
    //     "_id": "e20537ed11237f86bbb20ccb"
    //   },
    //   "createdAt": "2023-07-05T12:16:42.240Z"
    //}
  }
  deleteCard() {
    // 5-6 Deleting a card
    //TODO - Create a new HTML el, per FIGMA design (popup)
    //TODO - check how this el interacts with the index.js
    fetch("https://around-api.en.tripleten-services.com/v1/cards/cardID", {
      method: "DELETE",
      headers: {
        authorization: "e315e92f-7d1b-43f2-b057-cdca1769e40c",
        "Content-Type": "application/json",
        //FIXME - check the above content-type, is it needed?
      },
      //   body: JSON.stringify({
      //     name: "", // name of the created card
      //     link: "", // link to the image
      //   }),
    });
    //TODO - The cardId in the URL should be replaced with the _id parameter of the card to be deleted. The _id of each card is found in its respective JSON:
    // {
    //   "isLiked": false,
    //   "_id": "5d1f0611d321eb4bdcd707dd", // — here it is
    //   // ...other card data
    // }
    // As a result, the request to delet this card will look like this:
    // DELETE https://around-api.en.tripleten-services.com/v1/cards/5d1f0611d321eb4bdcd707dd
    // The response will look like this:
    // { "message": "This post has been deleted" }
  }

  handleLikeButton() {
    // 7. Adding and removing likes
    // check naming convention
    // using prior functions?
    //TODO - Send a PUT request to like a card: PUT https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
    //TODO - To remove the like, simply send a DELETE request with the same URL: DELETE https://around-api.en.tripleten-services.com/v1/cards/cardId/likes
    // cardId in the URL should be replaced with the _id property of the corresponding card.
    // The response will contain updated JSON with a card. Inside this JSON, the isLiked field will already be updated.
    // After adding or removing a like, the heart icon should change color.
  }

  updateProfilePicture() {
    // 8. Updating profile picture
    //TODO - HTML + CSS for the edit profile button per figma
    //TODO - HTML + CSS for the popup to edit profile picture
    fetch("https://around-api.en.tripleten-services.com/v1/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "e315e92f-7d1b-43f2-b057-cdca1769e40c",
        "Content-Type": "application/json",
        //FIXME - make sure this content-type is correct
      },
      body: JSON.stringify({
        avatar: "", // link to the new profile picture
        // anything besides a link, the server will return an error
      }),
    });
  }

  //ANCHOR - uncertain where the following belongs, or how to begin
  //TODO - 9. Improve UX of all forms
  // When editing a profile, you will notify the user that the upload process is underway by changing the button text to be "Saving...". This should be shown until the data has finished uploading:
  // Do the same thing for the forms used to add new cards and for the form used to update the user's profile picture.
}

//REVIEW - Is the following for the index.js?
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e315e92f-7d1b-43f2-b057-cdca1769e40c",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    // process result
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

// // User routes

// GET /users/me – Get the current user’s info
// PATCH /users/me – Update your profile information
// PATCH /users/me/avatar – Update avatar

// // Card routes

// GET /cards – Get all cards
// POST /cards – Create a card
// DELETE /cards/:cardId – Delete a card
// PUT /cards/:cardId/likes – Like a card
// DELETE /cards/:cardId/likes – Dislike a card
