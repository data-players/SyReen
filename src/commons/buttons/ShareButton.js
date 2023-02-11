import React, { useState } from 'react';
import { Button, useShowContext } from 'react-admin';
import ShareIcon from '@material-ui/icons/Share';
import { useCollection } from '@semapps/activitypub-components';
import ShareDialog from '../ShareDialog/ShareDialog';

const ShareButton = () => {
  const [shareOpen, setShareOpen] = useState(false);
  const { record } = useShowContext();
  const { loaded, error } = useCollection(record?.['apods:announces']);
  // If the user can see the list of announces, it means he can share
  if (loaded && !error) {
    return (
      <>
        <Button label="Partager" onClick={() => setShareOpen(true)}>
          <ShareIcon />
        </Button>
        {shareOpen && <ShareDialog resourceUri={record.id} close={() => setShareOpen(false)} />}
      </>
    );
  } else {
    return null;
  }
};

export default ShareButton;
