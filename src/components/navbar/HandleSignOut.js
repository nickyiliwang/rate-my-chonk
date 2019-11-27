import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { setUnAuthenticated } from "../../Redux/actions/userActions";

// firebase
import * as firebase from "firebase/app";
import "firebase/auth";

function HandleSignOut(props) {
  let history = useHistory();

  const handleSignOut = () => {
    firebase.auth().signOut();
    history.push("/");
    props.setUnAuthenticated();
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}

export default connect(null, { setUnAuthenticated })(HandleSignOut);
