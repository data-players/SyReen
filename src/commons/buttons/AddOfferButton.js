import React from 'react';
import { Button, Link, useRecordContext } from "react-admin";
import { makeStyles } from '@material-ui/core';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: '#FFF',
  },
}));

const AddOfferButton = () => {
  const classes = useStyles();
  const recordContext = useRecordContext();
  return (
    <>
      {recordContext?.id &&
        <Button
          component={Link}
          to={{
            pathname: "/offers/create",
            state: { record: { 'pair:partOf': recordContext.id } },
          }}
          label="Ajouter une offre"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          <ChatBubbleIcon />
        </Button>
      }
    </>
  );
}

export default AddOfferButton;