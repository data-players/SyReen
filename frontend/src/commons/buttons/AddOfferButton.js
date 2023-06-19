import React from 'react';
import { Button, Link, useRecordContext, useGetIdentity } from "react-admin";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const AddOfferButton = ({ linkType }) => {
  const recordContext = useRecordContext();
  const { identity } = useGetIdentity();
  return (
    <>
      {recordContext?.id && identity && identity.id === recordContext?.["dc:creator"] &&
        <Link 
          to={{
            pathname: "/offers/create",
            state: { 
              record: {
                'syreen:partOf': recordContext.id,
                'syreen:hasLocation': recordContext['syreen:hasLocation']
              }
            },
          }}
        >
          <Button label="Ajouter une offre">
            <ChatBubbleIcon />
          </Button>
        </Link>
      }
    </>
  );
}

export default AddOfferButton;