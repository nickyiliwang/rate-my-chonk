import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// components
import FirebaseAuth from "../components/FirebaseAuth";
import GetImgFromReddit from "../components/GetImgFromReddit";
import GetImgFromStorage from "../components/GetImgFromStorage";
import GetUserFavFromDb from "../components/GetUserFavFromDb";
import TypedReactDemo from "../components/Typed";

// redux
import { connect } from "react-redux";

class login extends Component {
  render() {
    return (
      <div id="home" className="login">
        <GetImgFromReddit timeQuery="all" />
        <GetImgFromStorage />
        <GetUserFavFromDb />
        <h2 className="welcomeText">Welcome to Rate my Chonk !</h2>
        <TypedReactDemo
          strings={[
            "Cute chubby cats",
            "Rate, favorite, browse",
            "Meow-nificent !",
            "Live in the mewment !",
            "Show some cat-titude !",
            "Paw-lease come in !",
            "Everyday is Caturday",
            "I'm paw-sitive you will enjoy your stay",
            "Best place for Pro-cat-stination !"
          ]}
        />
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
