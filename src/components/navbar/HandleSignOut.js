import React from "react";
// router
import { useHistory } from "react-router-dom";

// firebase
import * as firebase from "firebase/app";
import "firebase/auth";

function HandleSignOut() {
  let history = useHistory();
  const handleSignOut = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  return (
    <a href="#home" className="signOut" onClick={handleSignOut}>
      Sign out
    </a>
  );
}

export default HandleSignOut;
