import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// Component
import DisplayUserInfo from "../DisplayUserInfo";

// Redux
import { connect } from "react-redux";
import HandleSignOut from "./HandleSignOut";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    const activeStyleConfig = {
      fontWeight: "bold",
      color: "red",
      border: "5px solid red"
    };

    return (
      <div>
        {authenticated ? (
          <nav className="mainNav">
            <ul>
              <li>
                <DisplayUserInfo />
              </li>
              <li>
                <HandleSignOut />
              </li>
              <li>
                <NavLink activeStyle={activeStyleConfig} to="/user">
                  User Profile
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={activeStyleConfig} to="/chonder">
                  Chonder
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={activeStyleConfig} to="/hall">
                  Hall of Chonks
                </NavLink>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="mainNav">
            <ul>
              <li>
                <NavLink to="/">Login</NavLink>
              </li>
              <li>
                <NavLink to="/chonder">Chonder</NavLink>
              </li>
              <li>
                <NavLink to="/hall">Hall of Chonks</NavLink>
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
