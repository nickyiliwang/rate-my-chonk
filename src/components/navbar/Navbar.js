import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import hallOfChonks from '../../pages/hallOfChonks'
import  chonder from '../../pages/chonder'
import hallOfChonks from '../../pages/hallOfChonks'
import hallOfChonks from '../../pages/hallOfChonks'

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <div>
        {authenticated ? (
          <Fragment>
            <UploadMyChonks />
            <hallOfChonks />
            <chonder />

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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
