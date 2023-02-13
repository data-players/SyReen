import React from 'react';
import { Button, Link, linkToRecord, useRecordContext } from "react-admin";
import { makeStyles } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';

const useStyles = makeStyles((theme) => ({
  button: {
    '& .MuiButton-label': {
      '& span': {
        minWidth: 104
      }
    }
  }
}));

const ReturnToProjectButton = ({ linkType }) => {
  const record = useRecordContext();
  const classes = useStyles();
  return (
    <Button
      component={Link}
      to={linkToRecord('/projects', record?.['pair:partOf'], linkType) + '/1'}
      label="Voir Le projet"
      className={classes.button}
    >
      <WorkIcon />
    </Button>
  );
}

ReturnToProjectButton.defaultProps = {
  linkType: 'show'
};

export default ReturnToProjectButton;