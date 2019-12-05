import React, { Component } from "react";
import DisplayUserInfo from "../components/DisplayUserInfo";
import { UploadImageToStorage } from "../components/UploadImageToStorage";
import firebase from "../util/config";
import "firebase/auth";

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
          }, () => {
          });
        }
      });
  }
  renderUserUploads = () => {
    if (this.state.allUploads) {
      return this.state.allUploads.map(url => {
        return (
          <li className="userUploadedImages" key={url}>
            <img src={url} alt="user uploaded images" />
          </li>
        );
      });
    } else {
      return (
        <li>
          <p>All your uploads chonks here.</p>
        </li>
      );
    }
  };

  renderUserUploads = () => {
    if (this.state.allUserFavCatsArray) {
      return this.state.allUserFavCatsArray.map((cat, i) => {
        const url = cat.imageUrl;
        return (
          <li className="userFavoriteImages" key={i}>
            <img src={url} alt="user favorite chonks" />
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
            This is a is your profile page, which contains your uploaded cat
            images, as well as your favorite cats.
          </p>
          <div className="formUploadSection">
            <p>Upload your cat image here:</p>
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
          <p>You favorite chonks :</p>
          <ul className="favoriteCats">
            {this.renderUserUploads()}
          </ul>
        </div>
      </section>
    );
  }
}
