import React, { Fragment, useState } from "react";
// firebase
import * as firebase from "firebase/app";
import "firebase/auth";
// router
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
// mui
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// mui icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import Warning from "@material-ui/icons/Warning";
import PermIdentity from "@material-ui/icons/PermIdentity";
import HowToVote from "@material-ui/icons/HowToVote";
import Ballot from "@material-ui/icons/Ballot";
import Tooltip from "@material-ui/core/Tooltip";
// Redux
import { connect } from "react-redux";

// mui
const useStyles = makeStyles(theme => ({
  list: {
    width: "250px",
    overflow: "hidden"
  },
  fullList: {
    width: "auto"
  },
  // these buttons will be aligned to right side of abbBar
  toolbarButtonsRight: {
    [theme.breakpoints.down("335")]: {
      marginLeft: "0"
    },
    [theme.breakpoints.up("335")]: {
      marginLeft: "auto"
    }
  },
  listItemText: {
    color: "#247ba0",
    width: "200px"
  }
}));

// router active style
const activeStyleConfig = {
  borderBottom: "3px solid #ff1654",
  width: "60%",
  overflow: "hidden"
};

function MuiDrawer(props) {
  // handle sign-out
  let history = useHistory();
  const handleSignOut = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  // redux
  const { authenticated } = props;

  const classes = useStyles();
  // react hooks
  const [state, setState] = useState({
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

  // renders the always appearing list of nav icon buttons
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
        {authenticated && (
          <ListItem button key="Sign out">
            <ListItemIcon>
              <Warning />
            </ListItemIcon>
            <ListItemText
              primary="Sign out"
              onClick={handleSignOut}
              className={classes.listItemText}
            />
          </ListItem>
        )}

        <ListItem button key="User Profile">
          <ListItemIcon>
            <PermIdentity />
          </ListItemIcon>
          <NavLink activeStyle={activeStyleConfig} to="/user">
            <ListItemText
              primary="User Profile"
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>

        <ListItem button key="Chonder">
          <ListItemIcon>
            <HowToVote />
          </ListItemIcon>
          <NavLink activeStyle={activeStyleConfig} to="/chonder">
            <ListItemText primary="Chonder" className={classes.listItemText} />
          </NavLink>
        </ListItem>

        <ListItem button key="Hall of Chonks">
          <ListItemIcon>
            <Ballot />
          </ListItemIcon>
          <NavLink activeStyle={activeStyleConfig} to="/hall">
            <ListItemText
              primary="Hall of Chonks"
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Fragment>
      <Fragment>
        {/* user */}
        <Tooltip title="User Profile">
          <Button
            component={NavLink}
            to="/user"
            className={classes.toolbarButtonsRight}
          >
            <PermIdentity />
          </Button>
        </Tooltip>
        {/* hall */}
        <Tooltip title="Hall of Chonks">
          <Button component={NavLink} to="/hall">
            <Ballot />
          </Button>
        </Tooltip>
        {/* chonks */}
        <Tooltip title="Chonder">
          <Button component={NavLink} to="/chonder">
            <HowToVote />
          </Button>
        </Tooltip>
        {/* Sign-out */}
        {authenticated && (
          <Tooltip title="Sign out">
            <Button onClick={handleSignOut}>
              <Warning />
            </Button>
          </Tooltip>
        )}
        {/* nav */}
        <Tooltip title="Navigation">
          <Button onClick={toggleDrawer("right", true)}>
            <MenuIcon />
          </Button>
        </Tooltip>
      </Fragment>

      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(MuiDrawer);
