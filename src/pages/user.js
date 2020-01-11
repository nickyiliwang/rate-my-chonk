import React, { Component } from "react";
import DisplayUserInfo from "../components/DisplayUserInfo";
import { UploadImageToStorage } from "../components/UploadImageToStorage";
import firebase from "../util/config";
import "firebase/auth";
import { Link } from "react-router-dom";

export default class user extends Component {
  state = {
    allUploads: null,
    allUserFavCatsArray: null
  };

  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`users/${userId}`)
      .once("value", snapShot => {
        const data = snapShot.val();
        if (data) {
          this.setState({
            allUploads: data.userUploads,
            allUserFavCatsArray: data.userFavorites
          });
        }
      });
  }

  renderUserUploads = () => {
    if (this.state.allUploads) {
      return this.state.allUploads.map(url => {
        return (
          <li className="userUploadedImages" key={url}>
            <Link to={`chonk/${url.split("com/o/")[1]}`}>
              <img src={url} alt="user uploaded images" />
            </Link>
          </li>
        );
      });
    } else {
      return (
        <li>
          <p>All your uploaded chonks are here.</p>
        </li>
      );
    }
  };

  renderUserFavorites = () => {
    if (this.state.allUserFavCatsArray) {
      return this.state.allUserFavCatsArray.map((cat, i) => {
        const url = cat.imageUrl;
        const catHandle = cat.handle;
        return (
          <li className="userFavoriteImages" key={i}>
            <Link to={`chonk/${catHandle}`}>
              <img src={url} alt="user favorite chonks" />
            </Link>
          </li>
        );
      });
    } else {
      return (
        <li>
          <p>All your favorite chonks are here.</p>
        </li>
      );
    }
  };

  handleClick = e => {
    this.inputElement.click();
  };

  // Returns true if a user is signed-in.
  isUserSignedIn() {
    // Converts Object to boolean. If it was falsey (e.g. 0, null, undefined, etc.), it will be false, otherwise, true.
    return !!firebase.auth().currentUser;
  }

  handleOnChange = e => {
    e.preventDefault();
    const file = e.target.files[0];

    // Clear the selection in the file picker input.
    e.target.value = null;

    // Check if the file is an image.
    if (!file.type.match("image.*")) {
      console.log("only images are allowed");
      return;
    }
    // Check if the user is signed-in
    if (this.isUserSignedIn())
      UploadImageToStorage(file, this.state.allUploads);
  };

  render() {
    return (
      <section className="userProfile">
        <div className="wrapper">
          <DisplayUserInfo />
          <p>
            This is a is your profile page, where you can upload your cat
            images, and save your favorite chonks. Navigate to the chonder page
            on the top right to browse, rate, and favorite chonks!
          </p>
          <div className="formUploadSection">
            <p>Upload your cute chonks here:</p>
            <form
              onSubmit={e => e.preventDefault()}
              onChange={this.handleOnChange}
              id="image-form"
              action="#"
            >
              <label
                aria-label="this is where you upload cat pictures"
                htmlFor="mediaCapture"
              ></label>
              <input
                id="mediaCapture"
                type="file"
                accept="image/*"
                capture="camera"
                ref={input => (this.inputElement = input)}
              />
              <button
                onClick={this.handleClick}
                id="submitImage"
                title="Add an image"
                className="imageUpload"
              >
                Image Upload
              </button>
            </form>
          </div>

          <p>Chonks you uploaded :</p>
          <ul className="uploadedCats">{this.renderUserUploads()}</ul>
          <p>Your favorite chonks :</p>
          <ul className="favoriteCats">{this.renderUserFavorites()}</ul>
        </div>
      </section>
    );
  }
}
