import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import HandleSingOut from "./HandleSignOut";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;

    console.log(authenticated);
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
                  <HandleSingOut />
                </li>
                <li>
                  <Link to="/chonder">Chonder</Link>
                </li>
                <li>
                  <Link to="/hall">Hall of Chonks</Link>
                </li>
                <li>
                  <Link to="/user">User Profile</Link>
                </li>
              </ul>
            </nav>
          </Fragment>
        ) : (
          <Fragment>
            <nav>
              <ul>
                <li>
                  <Link to="/">Login</Link>
                </li>
                <li>
                  <Link to="/chonder">Chonder</Link>
                </li>
                <li>
                  <Link to="/hall">Hall of Chonks</Link>
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
