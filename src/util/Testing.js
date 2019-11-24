import Swing from 'react-swing'

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
import withFirebaseAuth from 'react-with-firebase-auth'
import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../util/config";

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
