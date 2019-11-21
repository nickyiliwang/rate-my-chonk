import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Chonder from "./pages/Chonder";
import HallOfChonks from "./pages/HallOfChonks";
import HomeLogin from "./pages/HomeLogin";
import HomeSignup from "./pages/HomeSignup";
import ProfileChonk from "./pages/ProfileChonk";
import ProfileUser from "./pages/ProfileUser";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rate My Chonk</h1>
        <Router>
          <div>
            <Switch>
              <Route path="/chonder">
                <Chonder />
              </Route>
              <Route path="/hall">
                <HallOfChonks />
              </Route>
              <Route path="/login">
                <HomeLogin />
              </Route>
              <Route path="/signup">
                <HomeSignup />
              </Route>
              <Route path="/chonk">
                <ProfileChonk />
              </Route>
              <Route path="/user">
                <ProfileUser />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
