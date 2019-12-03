import React, { Component } from "react";
// react router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./util/PrivateRoute";
// css
import "./reset.css";
import "./App.css";
// Components
import NavBar from "./components/navbar/Navbar";
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
              <PrivateRoute exact path="/hall">
                <Route exact path="/hall" component={hallOfChonks} />
              </PrivateRoute>
              <PrivateRoute exact path="/user">
                <Route exact path="/user" component={user} />
              </PrivateRoute>
            </Switch>
          </div>
        </main>
        <footer>
          <p>
            Made by{" "}
            <a
              id="externalLink"
              href="https://github.com/nickyiliwang?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nick Wang
            </a>
          </p>
        </footer>
      </Router>
    );
  }
}
