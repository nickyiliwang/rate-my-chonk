// this file contains all the experimental code that I don't want to lose, but they are related to the development of the project

import Swing from "react-swing";

<Swing
  className="stack"
  tagname="div"
  setStack={stack => this.setState({ stack: stack })}
  ref="stack"
  throwout={e => console.log("throwout", e)}
>
  <div
    className="card clubs"
    ref="card1"
    throwout={e => console.log("card throwout", e)}
  >
    Hello
  </div>
  <div className="card diamonds" ref="card2">
    ♦
  </div>
  <div className="card hearts" ref="card3">
    ♥
  </div>
  <div className="card spades" ref="card4">
    ♠
  </div>
</Swing>;

// end of swing

// npm install --save firebase react-with-firebase-auth
import withFirebaseAuth from "react-with-firebase-auth";
import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./config";

const app = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = app.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

class HomeLogin extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}
          {user ? (
            <button onClick={signOut}>Sign out</button>
          ) : (
            <button onClick={signInWithGoogle}>Sign in with Google</button>
          )}
        </header>
      </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(HomeLogin);

// end of shady auth

import React, { Component } from "react";
import * as firebaseui from "firebaseui";
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../../util/config";
import Login from "../../pages/front/login";
import { connect } from "react-redux";
import { setAuthenticated } from "../../Redux/actions/userActions";

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
    firebase.auth().signOut();
  };

  render() {
    return (
      <div>
        <h2>Auth Page</h2>
        {this.state.auth ? (
          <Login
            auth={this.state.auth}
            accessToken={this.state.accessToken}
            user={this.state.user}
            onClick={this.handleOnClick}
          />
        ) : (
          <div id="firebaseui-auth-container"></div>
        )}
      </div>
    );
  }
}

export default connect(null, { setAuthenticated })(FirebaseAuth);

// end of my own auth

firebase
  .database()
  .ref(`cats/${catHandle}`)
  .push("gimme");
// generating good db

// firebase multiupdate
var userId = 1234;
var photoKey = "sdfg486ds4g";
var updatePhoto = {};
updatePhoto[`/photos/${photoKey}/likes`] = 1;
updatePhoto[`/userPhotos/${userId}/${photoKey}/likes`] = 1;
firebase
  .database()
  .ref()
  .update(updatePhoto);

// Which produces the desired:
const result = {
  photos: {
    sdfg486ds4g: {
      url: "http://firebasestorage.com/image1",
      likes: "1"
    }
  },
  userPhotos: {
    1234: {
      sdfg486ds4g: {
        url: "http://firebasestorage.com/image1",
        likes: "1"
      }
    }
  }
};
//
