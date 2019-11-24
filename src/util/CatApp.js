import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
// MUI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";
// Util
import AuthRoute from "./util/AuthRoute"; // Redirect route, will redirect to home page if authorized
import themeFile from "./util/theme";
// Components
import Navbar from "./components/navbar/Navbar";
// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme(themeFile)}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/signup" component={signup} />
                <AuthRoute exact path="/login" component={login} />
                <Route exact path="/users/:handle" component={user} />
                <Route
                  exact
                  path="/users/:handle/post/:postId"
                  component={user}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
