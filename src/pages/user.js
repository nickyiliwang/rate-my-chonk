import React, { Component } from "react";
import DisplayUserInfo from "../components/DisplayUserInfo";
import { UploadImageToStorage } from "../components/UploadImageToStorage";
import firebase from "../util/config";
import "firebase/auth";

export default class user extends Component {
  state = {
    allUploads: null
  };

  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`users/${userId}`)
      .on("value", snapShot => {
        const data = snapShot.val();
        if (data) {
          this.setState({ allUploads: data.userUploads });
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
      <div>
        <DisplayUserInfo />
        <p>
          This is a is your profile page, which contains your uploaded cat
          images, as well as your favorite cats
        </p>
        <div className="formUploadSection">
          <p>Upload your cat image here:</p>
          <form
            onSubmit={e => e.preventDefault()}
            onChange={this.handleOnChange}
            id="image-form"
            action="#"
          >
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

        <ul className="uploadedCats">{this.renderUserUploads()}</ul>
        <p>Favorite Chonks</p>
        <ul className="favoriteCats"></ul>
      </div>
    );
  }
}
