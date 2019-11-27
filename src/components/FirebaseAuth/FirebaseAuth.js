// Import FirebaseAuth and firebase.
import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import { firebaseConfig } from "../../util/config";
import { connect } from "react-redux";
import { setAuthenticated } from "../../Redux/actions/userActions";

firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/user", // go to user page
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ]
};

class FirebaseAuth extends Component {
  state = {
    auth: false,
    user: null,
    accessToken: null,
    status: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          this.setState({ user });
          user.getIdToken().then(accessToken => {
            this.setState({ auth: true, accessToken });
            this.setState({ status: "Signed In" });
            this.props.setAuthenticated();
          });
        } else {
          this.setState({ auth: false, status: "Signed out" });
        }
      },
      function(error) {
        console.log(error);
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.auth ? null : (
          <div>
            <h2>Please Sign in or continue as guest</h2>
            <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { setAuthenticated })(FirebaseAuth);
