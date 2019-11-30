import React, { Component } from "react";
import "./reset.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import NavBar from "./components/navbar/Navbar";
import PrivateRoute from "./util/PrivateRoute";

// pages
import User from "./pages/user";
import login from "./pages/login";
import chonder from "./pages/chonder";
import hallOfChonks from "./pages/hallOfChonks";

export default class App extends Component {
  render() {
    return (
      <Router>
        <header>
          <NavBar />
        </header>
        <main>
          <div className="wrapper">
            <Switch>
              <Route exact path="/chonder" component={chonder} />
              <Route exact path="/hall" component={hallOfChonks} />
              <Route exact path="/" component={login} />
              <PrivateRoute exact path="/user">
                <User />
              </PrivateRoute>
            </Switch>
          </div>
        </main>
      </Router>
    );
  }
}
