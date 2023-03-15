import React from 'react';
import { Button, Link, useRecordContext } from "react-admin";
import { makeStyles } from '@material-ui/core';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
/*
const useStyles = makeStyles((theme) => ({
  button: {
    '& .MuiButton-label': {
      '& span': {
        minWidth: 104
      }
    }
  }
}));
*/


const AddOfferButton = ({ linkType }) => {
  const recordContext = useRecordContext();
  // const classes = useStyles();
  return (
    <>
      {recordContext?.id &&
        <Link 
          to={{
            pathname: "/offers/create",
            state: { 
              record: {
                'pair:partOf': recordContext.id,
                'pair:hasLocation': recordContext['pair:hasLocation']
              }
            },
          }}
        >
          <Button label="Ajouter une offre" /*className={classes.button}*/>
            <ChatBubbleIcon />
          </Button>
        </Link>
      }
    </>
  );
}

export default AddOfferButton;