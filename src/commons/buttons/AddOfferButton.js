import React from 'react';
import { Button, Link } from "react-admin";
import { makeStyles } from '@material-ui/core';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
}));

const AddOfferButton = ({ record }) => {
  const classes = useStyles();

  return (
    <Button
      component={Link}
      to={{
        pathname: "/offers/create",
        state: { record: { 'pair:partOf': record.id } },
      }}
      label="Ajouter une offre"
      variant="contained"
      color="primary"
      className={classes.button}
    >
      <ChatBubbleIcon />
    </Button>
  );
}

export default AddOfferButton;