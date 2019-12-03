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
      borderBottom: "3px solid #ff1654"
    };

    return (
      <div>
        {authenticated ? (
          <nav className="mainNav">
            <ul className="clearfix">
              <li className="titleIcon">
                <h1 onClick={() => window.location.reload(false)}>
                  Rate My Chonk
                </h1>
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
              <li>
                <DisplayUserInfo />
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="mainNav">
            <ul>
              <li className="titleIcon">
                <h1 onClick={() => window.location.reload(false)}>
                  Rate My Chonk
                </h1>
              </li>
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
