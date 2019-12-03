// Import FirebaseAuth and firebase.
import React, { Component } from "react";
// components
import GetUserFavFromDb from "../components/GetUserFavFromDb";
// firebase
import "firebase/auth";
import firebase from "../util/config";
import * as firebaseui from "firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// redux
import { connect } from "react-redux";
import {
  setAuthenticated,
  setUnAuthenticated
} from "../Redux/actions/userActions";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ]
};

class FirebaseAuth extends Component {
  state = {
    userId: null
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          const userCredentials = {
            displayName: user.displayName,
            userId: user.uId
          };
          this.setState({ userId: user.uId });
          this.props.setAuthenticated(userCredentials);
        } else {
          this.props.setUnAuthenticated();
        }
      },
      error => {
        console.error("something wrong with authentication", error);
      }
    );
  }

  render() {
    return (
      <section className="authorization">
        <h2>Please Sign in or continue as guest</h2>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        {this.state.userId && <GetUserFavFromDb userId={this.state.userId} />}
      </section>
    );
  }
}

export default connect(null, {
  setAuthenticated,
  setUnAuthenticated
})(FirebaseAuth);
