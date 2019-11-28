import React, { Component } from "react";
import "firebase/database";
import firebase from "../../util/config";
const dbRef = firebase.database().ref();

export default class Database extends Component {
  // key : {
  // catImg: name,
  // catRating: []
  // }

  render() {
    return <div>Database</div>;
  }
}
