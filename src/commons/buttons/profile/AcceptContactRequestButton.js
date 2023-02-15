import React, { useCallback } from 'react';
import { useNotify } from 'react-admin';
import { Button } from '@material-ui/core';
import { useOutbox, ACTIVITY_TYPES } from '@semapps/activitypub-components';

const AcceptContactRequestButton = ({ activity, refetch, children, ...rest }) => {
  const outbox = useOutbox();
  const notify = useNotify();

  const accept = useCallback(
    async () => {
      try {
        await outbox.post({
          type: ACTIVITY_TYPES.ACCEPT,
          actor: outbox.owner,
          object: activity.id,
          to: activity.actor,
        });
        notify('app.notification.contact_request_accepted');
        setTimeout(refetch, 3000);
      } catch (e) {
        notify(e.message, 'error');
      }
    },
    [outbox, notify, refetch, activity]
  );

  if (!activity) return null;

  return(
    <Button onClick={accept} {...rest}>
      {children || 'Accepter la demande'}
    </Button>
  );
};

export default AcceptContactRequestButton;
