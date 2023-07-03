import React, { useCallback } from 'react';
import { Button, useNotify } from 'react-admin';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ACTIVITY_TYPES, useOutbox } from '@semapps/activitypub-components';
import useSyreenGroupMember from "../../hooks/useSyreenGroupMember";

const GROUP_URI = process.env.REACT_APP_AGGREGATOR_BASE_URL + '/actors/syreen';

const JoinSyreenGroupButton = (props) => {
  const outbox = useOutbox();
  const notify = useNotify();
  const { isMember, loaded } = useSyreenGroupMember();

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

  const leaveGroup = useCallback(
    async () => {
      try {
        await outbox.post({
          type: ACTIVITY_TYPES.LEAVE,
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
    isMember ? (
      <Button label="Quitter" onClick={() => leaveGroup()} {...props}>
        <ExitToAppIcon />
      </Button>
    ) : (
      <Button label="Rejoindre" onClick={() => joinGroup()} {...props}>
        <GroupAddIcon />
      </Button>
    )
  );
};

export default JoinSyreenGroupButton;
