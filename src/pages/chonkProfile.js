import React, { Component } from "react";
import firebase from "../util/config";
import "firebase/auth";

export default class chonkProfile extends Component {
  state = {
    allUserFavorites: [],
    imageSrc: null
  };

  componentDidMount() {
    const urlHandle = this.props.match.params.id;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userId = user.uid;

        firebase
          .database()
          .ref(`users/${userId}`)
          .once("value", snapShot => {
            const data = snapShot.val();
            if (data) {
              const hasProperty = data.userFavorites.find(
                fav => fav.handle === urlHandle
              ).imageUrl;

              if (hasProperty) {
                this.setState({
                  imageSrc: hasProperty
                });
              } else {
                const tokenID = `${this.props.match.url.split("chonk/")[1]}${
                  this.props.location.search
                }`;

                this.setState({
                  imageSrc: `https://firebasestorage.googleapis.com/v0/b/rate-my-chonk.appspot.com/o/${tokenID}`
                });
              }
            }
          });
      } else {
        console.log("No user is signed in");
      }
    });
  }

  render() {
    return (
      <div>
        <img src={this.state.imageSrc} alt="user uploaded images" />
      </div>
    );
  }
}
