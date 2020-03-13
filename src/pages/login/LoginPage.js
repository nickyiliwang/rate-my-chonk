import React from "react";
import { Redirect } from "react-router-dom";
// components
import FirebaseAuth from "../../components/Firebase/Auth";
import RedditImages from "../../components/Fetching/RedditImages";
import StorageImages from "../../components/Fetching/FBStorageImages";
import UserFavorites from "../../components/Fetching/UserFavorites";
import TypedAnimation from "../../components/TypedAnimation/TypedAnimation";
// redux
import { connect } from "react-redux";

const LoginPage = ({ auth }) => (
  <div id="home" className="login">
    <RedditImages timeQuery="all" />
    <StorageImages />
    <UserFavorites />
    <h2 className="welcomeText">Welcome to Rate my Chonk !</h2>
    <TypedAnimation
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
    {auth ? (
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

const mapStateToProps = state => ({
  auth: state.user.authenticated
});

export default connect(mapStateToProps)(LoginPage);
