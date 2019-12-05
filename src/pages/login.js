import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// components
import FirebaseAuth from "../components/FirebaseAuth";
import GetImgFromReddit from "../components/GetImgFromReddit";
import GetImgFromStorage from "../components/GetImgFromStorage";
import GetUserFavFromDb from "../components/GetUserFavFromDb";
// redux
import { connect } from "react-redux";

class login extends Component {
  render() {
    return (
      <div id="home" className="login">
        <GetImgFromReddit />
        <GetImgFromStorage />
        <GetUserFavFromDb />
        <h2 className="welcomeText">Welcome to Rate my Chonk !</h2>

        {this.props.auth ? (
          <div>
            <Redirect
              to={{
                pathname: "/user"
              }}
            />
          </div>
        ) : (
          <div>
            <FirebaseAuth />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.user.authenticated
});

export default connect(mapStateToProps)(login);
