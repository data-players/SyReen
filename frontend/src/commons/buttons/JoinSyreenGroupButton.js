import React, { useCallback } from 'react';
import { Button, useNotify } from 'react-admin';
import ShareIcon from '@material-ui/icons/Share';
import { ACTIVITY_TYPES, useOutbox } from '@semapps/activitypub-components';

const GROUP_URI = process.env.REACT_APP_AGGREGATOR_BASE_URL + '/actors/syreen';

const JoinSyreenGroupButton = () => {
  const outbox = useOutbox();
  const notify = useNotify();

  const joinGroup = useCallback(
    async () => {
      try {
        await outbox.post({
          type: ACTIVITY_TYPES.JOIN,
          actor: outbox.owner,
          object: GROUP_URI,
          to: GROUP_URI,
        });
        notify('Demande envoyée');
      } catch (e) {
        notify(e.message, { type: 'error' });
      }
    },
    [outbox, notify]
  );

  return (
      <Button label="Rejoindre groupe Syreen" onClick={() => joinGroup()}>
        <ShareIcon />
      </Button>
  );
};

export default JoinSyreenGroupButton;
