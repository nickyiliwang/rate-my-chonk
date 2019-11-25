import React, { Component, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
// Redux
import { connect } from "react-redux";

// firebase
import * as firebase from "firebase/app";
import "firebase/auth";

class Navbar extends Component {
  handleSignOut() {
    firebase.auth().signOut();
    history.push("/");
  }

  render() {
    const { authenticated } = this.props;
    let history = useHistory();

    return (
      <div>
        {authenticated ? (
          <Fragment>
            <nav>
              <ul>
                <li>
                  <p>Welcome user</p>
                </li>
                <li>
                  <button onClick={this.handleSignOut}>Sign out</button>
                </li>
                <li>
                  <Button component={Link} to="/chonder">
                    Chonder
                  </Button>
                </li>
                <li>
                  <Button component={Link} to="/hall">
                    Hall of Chonks
                  </Button>
                </li>
                <li>
                  <Button component={Link} to="/user">
                    User Profile
                  </Button>
                </li>
              </ul>
            </nav>
          </Fragment>
        ) : (
          <Fragment>
            <nav>
              <ul>
                <li>
                  <Button component={Link} to="/">
                    login
                  </Button>
                </li>
                <li>
                  <Button component={Link} to="/signup">
                    signup
                  </Button>
                </li>
              </ul>
            </nav>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
