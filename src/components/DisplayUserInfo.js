import React, { Component } from "react";
import { connect } from "react-redux";

export class DisplayUserInfo extends Component {
  render() {
    return (
      <div>
        <p>
          Hello {this.props.userName === null ? "Guest" : this.props.userName}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.user.credentials.displayName
});

export default connect(mapStateToProps)(DisplayUserInfo);
