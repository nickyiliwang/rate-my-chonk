import React, { Component } from "react";
import DisplayUserInfo from "../components/DisplayUserInfo";

export default class user extends Component {
  render() {
    return (
      <div>
        {<DisplayUserInfo />}
        <p>This is a user profile page</p>
        <p>Favorite Chonks</p>
        <ul></ul>
      </div>
    );
  }
}
