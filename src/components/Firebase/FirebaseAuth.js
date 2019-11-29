// Import FirebaseAuth and firebase.
import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/auth";
import firebase from "../../util/config";
import * as firebaseui from "firebaseui";
import { connect } from "react-redux";
import {
  setAuthenticated,
  setUnAuthenticated
} from "../../Redux/actions/userActions";

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
    auth: false,
    accessToken: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          const userCredentials = {
            displayName: user.displayName,
            userId: user.uId
          };

          this.setState({ auth: true });
          this.props.setAuthenticated(userCredentials);
        } else {
          this.setState({ auth: false });
          this.props.setUnAuthenticated(user);
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

export default connect(null, { setAuthenticated, setUnAuthenticated })(
  FirebaseAuth
);
