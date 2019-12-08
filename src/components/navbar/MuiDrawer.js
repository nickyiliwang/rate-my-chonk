import React from "react";
import { NavLink } from "react-router-dom";
// Component
import DisplayUserInfo from "../DisplayUserInfo";

// firebase
import * as firebase from "firebase/app";
import "firebase/auth";

// router
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import Warning from "@material-ui/icons/Warning";
import PermIdentity from "@material-ui/icons/PermIdentity";
import HowToVote from "@material-ui/icons/HowToVote";
import Ballot from "@material-ui/icons/Ballot";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});
const activeStyleConfig = {
  fontWeight: "bold",
  borderBottom: "3px solid #ff1654"
};

export default function MuiDrawer() {
  let history = useHistory();
  const handleSignOut = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <IconButton onClick={toggleDrawer(side, false)}>
        <ChevronRightIcon />
      </IconButton>
      <List>
        <ListItem button key="Sign out">
          <ListItemIcon>
            <Warning />
          </ListItemIcon>
          <ListItemText primary="Sign out" onClick={handleSignOut} />
        </ListItem>

        <ListItem button key="User Profile">
          <ListItemIcon>
            <PermIdentity />
          </ListItemIcon>
          <NavLink activeStyle={activeStyleConfig} to="/user">
            <ListItemText primary="User Profile" />
          </NavLink>
        </ListItem>

        <ListItem button key="Chonder">
          <ListItemIcon>
            <HowToVote />
          </ListItemIcon>
          <NavLink activeStyle={activeStyleConfig} to="/chonder">
            <ListItemText primary="Chonder" />
          </NavLink>
        </ListItem>

        <ListItem button key="Hall of Chonks">
          <ListItemIcon>
            <Ballot />
          </ListItemIcon>
          <NavLink activeStyle={activeStyleConfig} to="/hall">
            <ListItemText primary="Hall of Chonks" />
          </NavLink>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </div>
  );
}
