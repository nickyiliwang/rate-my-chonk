import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// components
import FirebaseAuth from "../components/FirebaseAuth";
import GetImgFromReddit from "../components/GetImgFromReddit";
import GetImgFromStorage from "../components/GetImgFromStorage";
// redux
import { connect } from "react-redux";

class login extends Component {
  render() {
    return (
      <div className="login">
        <GetImgFromReddit />
        <GetImgFromStorage />
        {this.props.auth ? (
          <Redirect
            to={{
              pathname: "/chonder"
            }}
          />
        ) : (
          <FirebaseAuth />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.user.authenticated
});

export default connect(mapStateToProps)(login);
