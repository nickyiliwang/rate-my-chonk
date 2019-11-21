import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Components
import UploadMyChonks from './'


// Redux
import { connect } from "react-redux";
// MUI
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";
// Icons
import HomeIcon from "@material-ui/icons/Home";

class Navbar extends Component {
  render() {
    // const { authenticated } = this.props;
    const authenticated = true

    return (
      <AppBar>
        <ToolBar className="nav-container">
          {authenticated ? (
            <Fragment>
              <UploadMyChonks />
              <Link to="/user">
                <CustomButton tip="Profile">
                  <HomeIcon />
                </CustomButton>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
<nav>
              <ul>
                <li>
                  <Link to="/chonder">
                    <Chonder />
                  </Link>
                </li>
                <li>
                  <Link to="/hall">
                    <HallOfChonks />
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <HomeLogin />
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <HomeSignup />
                  </Link>
                </li>
                <li>
                  <Link to="/chonk">
                    <ProfileChonk />
                  </Link>
                </li>
                <li>
                  <Link to="/user">
                    <ProfileUser />
                  </Link>
                </li>
              </ul>
            </nav>

              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </ToolBar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
  });

export default connect(mapStateToProps)(Navbar);
