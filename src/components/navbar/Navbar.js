import React, { Component } from "react";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import HandleSignOut from "./HandleSignOut";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <div>
        {authenticated ? (
          <nav className="mainNav">
            <ul>
              <li>
                <p>Welcome user</p>
              </li>
              <li>
                <HandleSignOut />
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
        ) : (
          <nav className="mainNav">
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
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
