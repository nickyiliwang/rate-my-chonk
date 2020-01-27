import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(theme => ({
  root: {
    width: 450 + theme.spacing(3) * 2
  }
}));

const ChonkSlider = withStyles({
  root: {
    color: "red",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

const marks = [
  {
    value: 0,
    label: "Fine Boi"
  },
  {
    value: 20,
    label: "Chomnk"
  },
  {
    value: 40,
    label: "HEFTY"
  },
  {
    value: 70,
    label: "MEGACHONK"
  },
  {
    value: 100,
    label: "OH LAWD HE COMIN"
  }
];

export default function CustomizedSlider({ onValueChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ChonkSlider
        valueLabelDisplay="auto"
        aria-label="chonk slider"
        defaultValue={0}
        marks={marks}
        onChangeCommitted={(e, val) => onValueChange(val)}
      />
    </div>
  );
}
