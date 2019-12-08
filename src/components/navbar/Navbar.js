import React from "react";
import { NavLink } from "react-router-dom";
// Component
import DisplayUserInfo from "../DisplayUserInfo";
import TemporaryDrawer from "./MuiDrawer";

// mui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

// Redux
import { connect } from "react-redux";
import HandleSignOut from "./HandleSignOut";

// mui
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const { authenticated } = props;
  const activeStyleConfig = {
    fontWeight: "bold",
    borderBottom: "3px solid #ff1654"
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <TemporaryDrawer />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
    // <div className="mainNav">
    //   {authenticated ? (
    //     <div>
    //                   <Button
    //         aria-controls="simple-menu"
    //         aria-haspopup="true"
    //         onClick={handleClick}
    //       >
    //         Open Menu
    //       </Button>
    //       <Menu
    //         id="simple-menu"
    //         anchorEl={anchorEl}
    //         keepMounted
    //         open={Boolean(anchorEl)}
    //         onClose={handleClose}
    //       >
    //         <MenuItem onClick={handleClose}>Profile</MenuItem>
    //         <MenuItem onClick={handleClose}>My account</MenuItem>
    //         <MenuItem onClick={handleClose}>Logout</MenuItem>
    //       </Menu>
    // </div>
    // <nav className="mainNav">
    //   <ul className="clearfix">
    //     <li className="titleIcon">
    //       <h1 onClick={() => window.location.reload(false)}>
    //         Rate My Chonk
    //       </h1>
    //     </li>
    //     <li>
    //       <HandleSignOut />
    //     </li>

    //     <li>
    //       <NavLink activeStyle={activeStyleConfig} to="/user">
    //         User Profile
    //       </NavLink>
    //     </li>
    //     <li className="chonderNav">
    //       <NavLink activeStyle={activeStyleConfig} to="/chonder">
    //         Chonder
    //       </NavLink>
    //     </li>
    //     <li className="hallOfChonksNav">
    //       <NavLink activeStyle={activeStyleConfig} to="/hall">
    //         Hall of Chonks
    //       </NavLink>
    //     </li>
    //     <li>
    //       <DisplayUserInfo />
    //     </li>
    //   </ul>
    // </nav>
    //   ) : (
    //     <nav className="mainNav">
    //       <ul>
    //         <li className="titleIcon">
    //           <h1 onClick={() => window.location.reload(false)}>
    //             Rate My Chonk
    //           </h1>
    //         </li>
    //         <li>
    //           <NavLink to="/">Login</NavLink>
    //         </li>
    //         <li className="chonderNav">
    //           <NavLink to="/chonder">Chonder</NavLink>
    //         </li>
    //         <li className="hallOfChonksNav">
    //           <NavLink to="/hall">Hall of Chonks</NavLink>
    //         </li>
    //       </ul>
    //     </nav>
    //   )}
    // </div>
  );
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
