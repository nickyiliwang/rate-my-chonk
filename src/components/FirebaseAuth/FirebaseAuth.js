import React, { Component } from "react";
import * as firebaseui from "firebaseui";
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../../util/config";
import Login from "../../pages/HomeLogin";

firebase.initializeApp(firebaseConfig);

// FirebaseUI config.
const uiConfig = {
  signInSuccessUrl: "<url-to-redirect-to-on-success>",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ]
};
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

export default class FirebaseAuth extends Component {
  state = {
    auth: false,
    status: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          user.getIdToken().then(accessToken => {
            console.log(accessToken);
            this.setState({ status: "Signed In" });
          });
        } else {
          this.setState({ status: "Signed out" });
        }
      },
      function(error) {
        console.log(error);
      }
    );
  }

  handleOnClick = () => {
    this.setState({ auth: !this.state.auth });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleOnClick}>Click</button>
        {this.state.auth ? (
          <Login auth={this.state.auth} />
        ) : (
          <Login auth={this.state.auth} />
        )}
      </div>
    );
  }
}
