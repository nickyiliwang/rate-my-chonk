import React from "react";
// react router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./util/PrivateRoute";
// css
import "./style/styles.scss";
// Components
import Navbar from "./components/Navbar/Navbar";
// pages
import UserPage from "./pages/user/UserPage";
import LoginPage from "./pages/login/LoginPage";
import ChonderPage from "./pages/chonder/ChonderPage";
import HallOfChonksPage from "./pages/hallOfChonks/HallOfChonksPage";
import ChonkProfilePage from "./pages/chonkProfile/ChonkProfilePage";

const App = () => (
  <Router>
    <Navbar />
    <main>
      <div className="wrapper">
        <Switch>
          <Route exact path="/chonk/:id" component={ChonkProfilePage} />
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute exact path="/chonder">
            <Route exact path="/chonder" component={ChonderPage} />
          </PrivateRoute>
          <PrivateRoute exact path="/hall">
            <Route exact path="/hall" component={HallOfChonksPage} />
          </PrivateRoute>
          <PrivateRoute exact path="/user">
            <Route exact path="/user" component={UserPage} />
          </PrivateRoute>

          {/* Dev Routes */}
          {/* <Route exact path="/chonk/:id" component={chonkProfile} />
          <Route exact path="/" component={login} />
          <Route exact path="/chonder" component={chonder} />
          <Route exact path="/hall" component={hallOfChonks} />
          <Route exact path="/user" component={user} /> */}
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
        ,{" "}
        <a
          id="externalLink"
          href="https://pets.webmd.com/cats/guide/fat-cats-getting-tubby-tabby-back-into-shape#1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Help your chonk?
        </a>
      </p>
    </footer>
  </Router>
);

export default App;
