import React, { Component } from "react";
import DisplayUserInfo from "../components/DisplayUserInfo";
import { saveImageMessage } from "../components/UploadImageToStorage";
import firebase from "../util/config";
import "firebase/auth";

export default class user extends Component {
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
    if (this.isUserSignedIn()) {
      saveImageMessage(file);
    }
  };

  render() {
    return (
      <div>
        <DisplayUserInfo />
        <p>
          This is a is your profile page, which contains your uploaded cat
          images, as well as your favorite cats
        </p>
        <p>Upload your cat image here:</p>
        <ul className="uploadedCats"></ul>
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
        <p>Favorite Chonks</p>
        <ul className="favoriteCats"></ul>
      </div>
    );
  }
}
