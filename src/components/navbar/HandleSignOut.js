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
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}

export default HandleSignOut;
