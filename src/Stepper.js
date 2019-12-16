import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

const useStyles = makeStyles({
  root: {
    width: "100%",
    flexGrow: 0.5,
    justifyContent: "center",
    alignItems: 'flex-end',
  },
});

export default function Stepper(props) {
  const classes = useStyles();

  return (
    <MobileStepper
      variant="dots"
      steps={6}
      position="static"
      activeStep={props.step}
      className={classes.root}
    />
  );
}