import React, { Component } from "react";
import FirebaseAuth from "./components/FirebaseAuth/FirebaseAuth";
import axios from 'axios'
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

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <AuthButton />
  
          <Switch>
            <Route path="/public">
              <Login />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/protected">
              <ProtectedPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );


  }

}
