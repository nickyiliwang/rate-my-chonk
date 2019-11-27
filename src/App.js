import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import NavBar from "./components/navbar/Navbar";
import PrivateRoute from "./util/PrivateRoute";

// pages
import User from "./pages/profile/user";
import login from "./pages/login";
import chonder from "./pages/chonder";
import hallOfChonks from "./pages/hallOfChonks";

axios.defaults.baseURL = "http://localhost:3000/";

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <div>
          <Switch>
            <Route exact path="/chonder" component={chonder} />
            <Route exact path="/hall" component={hallOfChonks} />
            <Route exact path="/" component={login} />
            
            {/* <PrivateRoute exact path="/user" component={user} /> */}

            <PrivateRoute exact path="/user">
              <User />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}
