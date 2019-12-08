import React from "react";
// Component
import MuiDrawer from "./MuiDrawer";

// mui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

// Redux
import { connect } from "react-redux";


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
  },
  // these buttons will be aligned to right side of abbBar
  toolbarButtonsRight: {
    marginRight: -12,
    marginLeft: "auto"
  },
  iconTypography: {
    fontFamily: "Playfair Display",
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "white",
    textTransform: "capitalize"
  }
}));


function Navbar(props) {
  const classes = useStyles();
  const { authenticated } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.menuButton}>
          <Button onClick={() => window.location.reload(false)}>
            <Typography className={classes.iconTypography} variant="h1">
              Rate My Chonk
            </Typography>
          </Button>

          <IconButton
            className={classes.toolbarButtonsRight}
            edge="start"
            color="inherit"
            aria-label="menu"
          />
          <MuiDrawer />
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
