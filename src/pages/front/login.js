import React, { Component } from "react";

class HomeLogin extends Component {
  render() {
    console.log(this.props.auth);
    return (
      <div>
        <h2>Sign In Status: {this.props.auth}</h2>
        <h2>
          You are
          {this.props.auth
            ? " signed-In "
            : " Signed out please use the following method to continue"}
        </h2>
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }
}

export default HomeLogin;

//     firebase.auth().signOut();
