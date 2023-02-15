import React, { useCallback } from 'react';
import { useNotify } from 'react-admin';
import { Button } from '@material-ui/core';
import { useOutbox, ACTIVITY_TYPES } from '@semapps/activitypub-components';

const RejectContactRequestButton = ({ activity, refetch, children, ...rest }) => {
  const outbox = useOutbox();
  const notify = useNotify();

  const reject = useCallback(
    async () => {
      try {
        await outbox.post({
          type: ACTIVITY_TYPES.REJECT,
          actor: outbox.owner,
          object: activity.id,
          to: activity.actor,
        });
        notify('app.notification.contact_request_rejected');
        setTimeout(refetch, 3000);
      } catch (e) {
        notify(e.message, 'error');
      }
    },
    [outbox, refetch, notify, activity]
  );

  if (!activity) return null;

  return(
    <Button onClick={reject} {...rest}>
      {children || 'Rejeter la demande'}
    </Button>
  );
};

export default RejectContactRequestButton;
