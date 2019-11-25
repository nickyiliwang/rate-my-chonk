import React, { Component } from "react";
import FirebaseAuth from "./components/FirebaseAuth/FirebaseAuth";
import axios from "axios";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import NavBar from "./components/navbar/Navbar";
import PrivateRoute from './util/PrivateRoute'

// pages
import user from "./pages/profile/user";
import login from "./pages/front/login";

axios.defaults.baseURL = "http://localhost:3000/";


export default class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <div>
          <Switch>
            <Route exact path="/" component={login} />
            <PrivateRoute exact path="/user" component={user} />
          </Switch>
        </div>
      </Router>
    );
  }
}
