import React, { Component } from "react";
import { connect } from "react-redux";

export class DisplayUserInfo extends Component {
  render() {
    return (
      <p className="userDisplayName">
        Hello {this.props.userName === null ? "Guest" : this.props.userName} !
      </p>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.user.credentials.displayName
});

export default connect(mapStateToProps)(DisplayUserInfo);
