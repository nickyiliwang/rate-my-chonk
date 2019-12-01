import React, { Component } from "react";
import "./reset.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Components
import NavBar from "./components/navbar/Navbar";
import PrivateRoute from "./util/PrivateRoute";

// pages
import user from "./pages/user";
import login from "./pages/login";
import chonder from "./pages/chonder";
import hallOfChonks from "./pages/hallOfChonks";

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <main>
          <div className="wrapper">
            <Switch>
              <Route exact path="/" component={login} />
              <PrivateRoute exact path="/chonder">
                <Route exact path="/chonder" component={chonder} />
              </PrivateRoute>
              <Route exact path="/hall" component={hallOfChonks} />
              <PrivateRoute exact path="/user">
                <Route exact path="/user" component={user} />
              </PrivateRoute>
            </Switch>
          </div>
        </main>
      </Router>
    );
  }
}
