import React, { Component } from "react";
import FirebaseAuth from "../components/FirebaseAuth";
import GetImgFromReddit from "../components/GetImgFromReddit";

class login extends Component {
  render() {
    return (
      <div>
        <FirebaseAuth />
        <GetImgFromReddit />
      </div>
    );
  }
}

export default login;
