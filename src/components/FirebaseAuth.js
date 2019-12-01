// Import FirebaseAuth and firebase.
import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/auth";
import firebase from "../util/config";
import * as firebaseui from "firebaseui";
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
  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          const userCredentials = {
            displayName: user.displayName,
            userId: user.uId
          };
          this.props.setAuthenticated(userCredentials);
        } else {
          this.props.setUnAuthenticated(user);
        }
      },
      error => {
        console.error("something wrong with authentication", error);
      }
    );
  }

  render() {
    return (
      <div>
        {!this.props.auth && (
          <section className="login">
            <h2>Please Sign in or continue as guest</h2>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </section>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.user.authenticated
});

export default connect(mapStateToProps, {
  setAuthenticated,
  setUnAuthenticated
})(FirebaseAuth);
