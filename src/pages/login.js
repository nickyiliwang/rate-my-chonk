import React, { Component } from "react";
import FirebaseAuth from "../components/FirebaseAuth";
import GetImgFromReddit from "../components/GetImgFromReddit";
// redux
import { connect } from "react-redux";

class login extends Component {
  render() {
    return (
      <div className="login">
        <GetImgFromReddit />
        {!this.props.auth && <FirebaseAuth />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.user.authenticated
});

export default connect(mapStateToProps)(login);
