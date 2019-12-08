import React from "react";
// Component
import MuiDrawer from "./MuiDrawer";
// mui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// mui
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    background: "#247ba0"
  },
  toolbar: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  iconTypography: {
    [theme.breakpoints.up("480")]: {
      fontFamily: "Playfair Display",
      fontWeight: "bold",
      fontSize: "1.5rem",
      textTransform: "capitalize",
      color: "white"
    }
  },
  iconButton: {
    [theme.breakpoints.down("480")]: {
      display: 'none'
    }
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Button onClick={() => window.location.reload(false)} className={classes.iconButton}>
            <Typography className={classes.iconTypography} variant="h1">
              Rate My Chonk
            </Typography>
          </Button>
          <MuiDrawer />
        </Toolbar>
      </AppBar>
    </div>
  );
}
