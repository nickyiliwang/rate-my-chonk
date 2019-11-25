import React from "react";
import { connect } from "react-redux";

function PrivateRoute({ children, ...rest }) {
  const authentication = this.props;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authentication ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.authenticated
});

export default connect(mapStateToProps)(PrivateRoute);
