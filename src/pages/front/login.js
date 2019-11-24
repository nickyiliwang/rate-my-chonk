import React, { Component } from "react";
import { connect } from 'react-redux'


class HomeLogin extends Component {
  render() {
    console.log(this.props.authState)
    return (
      <div>
        <h2>
          {this.props.auth
            ? `Hello there ${
                !this.props.user.displayName
                  ? "guest"
                  : this.props.user.displayName
              }`
            : " You are signed out please use the following method to continue"}
        </h2>
        <button onClick={this.props.onClick}>Click here to sign-out</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authState: state.user.authenticated
})


export default connect(mapStateToProps, null)(HomeLogin);