// Import FirebaseAuth and firebase.
import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import { firebaseConfig } from "../../util/config";
import { connect } from "react-redux";
import { setAuthenticated } from "../../Redux/actions/userActions";
import Login from "../../pages/front/login";

firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/signedIn",
  // We will display Google and Facebook as auth providers.
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
          this.setState({ status: "Signed out" });
        }
      },
      function(error) {
        console.log(error);
      }
    );
  }

  render() {
    console.log(this.state.auth);
    return (
      <div>
        <h2>Auth Page</h2>
        {this.state.auth ? (
          <Login
            auth={this.state.auth}
            accessToken={this.state.accessToken}
            user={this.state.user}
          />
        ) : (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default connect(null, { setAuthenticated })(FirebaseAuth);
