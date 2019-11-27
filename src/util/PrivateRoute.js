import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, authentication, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authentication ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  authentication: state.user.authenticated
});

export default connect(mapStateToProps)(PrivateRoute);
