import React from 'react';
import { Button } from "react-admin";
import { makeStyles } from '@material-ui/core';
import CameraIcon from "@material-ui/icons/CameraAlt";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  icon: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 64
    }
  }
}));

const EnableCaptureButton = ({ handleClickOnEnableCaptureButton }) => {
  const classes = useStyles();

  return (
    <Button
      onClick={handleClickOnEnableCaptureButton}
      label="Prendre une photo"
      variant="contained"
      color="primary"
      className={classes.button}
    >
      <CameraIcon className={classes.icon} />
    </Button>
  );
}

export default EnableCaptureButton;