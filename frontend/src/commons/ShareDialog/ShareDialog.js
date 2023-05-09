import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useShowContext, useNotify, ListBase } from 'react-admin';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import { useCheckAuthenticated, useAgents } from '@semapps/auth-provider';
import ContactsShareList from './ContactsShareList';
import { useCollection, useOutbox, ACTIVITY_TYPES } from '@semapps/activitypub-components';

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    margin: 16,
  },
  title: {
    padding: 24,
    [theme.breakpoints.down('sm')]: {
      padding: 16,
      paddingBottom: 4,
    },
  },
  actions: {
    padding: 15,
    height: 38,
  },
  list: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  listForm: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    marginRight: 24,
    height: 300,
    [theme.breakpoints.down('sm')]: {
      padding: '0px 16px',
      margin: 0,
    },
  },
}));

const SYREEN_GROUP_URI = process.env.REACT_APP_AGGREGATOR_BASE_URL + '/actors/syreen';

const ShareDialog = ({ close, resourceUri }) => {
  const classes = useStyles();
  const { identity } = useCheckAuthenticated();
  const { record } = useShowContext();
  const isOrganizer = record?.['dc:creator'] === identity?.id;
  const { items: announces } = useCollection(record?.['apods:announces']);
  const { items: announcers } = useCollection(record?.['apods:announcers']);
  const [newInvitations, setNewInvitations] = useState({});
  const [sendingInvitation, setSendingInvitation] = useState(false);
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  const outbox = useOutbox();
  const notify = useNotify();
  const [currentPublicState, setCurrentPublicState] = useState(false);
  const [currentGroupState, setCurrentGroupState] = useState(false);
  const [pendingPublicState, setPendingPublicState] = useState(false);
  const [pendingGroupState, setPendingGroupState] = useState(false);
  const { agents, addPermission, removePermission } = useAgents(resourceUri);

  // URI of type https://mypod.store/_groups/username/syreen
  const syreenAclGroupUri = useMemo(() => {
    if (identity) {
      const url = new URL(identity.id);
      return url.origin + '/_groups' + url.pathname + '/syreen';
    }
  }, [identity]);

  useEffect(() => {
    if (Object.keys(agents).length > 0 && syreenAclGroupUri) {
      setCurrentPublicState(agents["foaf:Agent"]?.permissions.includes('acl:Read') || false);
      setPendingPublicState(agents["foaf:Agent"]?.permissions.includes('acl:Read') || false);
      setCurrentGroupState(agents[syreenAclGroupUri]?.permissions.includes('acl:Read') || false);
      setPendingGroupState(agents[syreenAclGroupUri]?.permissions.includes('acl:Read') || false);
    }
  }, [agents, syreenAclGroupUri, setCurrentPublicState, setPendingPublicState, setCurrentGroupState, setPendingGroupState]);

  const nbInvitations = useMemo(() =>
    Object.keys(newInvitations).length + (pendingPublicState !== currentPublicState ? 1 : 0) + (pendingGroupState !== currentGroupState ? 1 : 0)
  , [newInvitations, pendingPublicState, currentPublicState, pendingGroupState, currentGroupState]);

  const addInvitation = useCallback(
    (actorUri, rights) => {
      setNewInvitations((prevState) => {
        const newState = { ...prevState };
        newState[actorUri] = rights;
        return newState;
      });
    },
    [setNewInvitations]
  );

  const removeInvitation = useCallback(
    (actorUri) => {
      setNewInvitations((prevState) => {
        const newState = { ...prevState };
        delete newState[actorUri];
        return newState;
      });
    },
    [setNewInvitations]
  );

  const sendInvitations = useCallback(async () => {
    setSendingInvitation(true);
    const actorsWithNewViewRight = Object.keys(newInvitations).filter((actorUri) =>
      newInvitations[actorUri].includes('view')
    );
    if (actorsWithNewViewRight.length > 0) {
      if (isOrganizer) {
        await outbox.post({
          type: ACTIVITY_TYPES.ANNOUNCE,
          actor: outbox.owner,
          object: resourceUri,
          target: actorsWithNewViewRight,
          to: actorsWithNewViewRight,
        });
      } else {
        // Offer the organizer to invite these people
        await outbox.post({
          type: ACTIVITY_TYPES.OFFER,
          actor: outbox.owner,
          object: {
            type: ACTIVITY_TYPES.ANNOUNCE,
            actor: outbox.owner,
            object: resourceUri,
            target: actorsWithNewViewRight,
          },
          target: record['dc:creator'],
          to: record['dc:creator'],
        });
      }
    }

    const actorsWithNewShareRight = Object.keys(newInvitations).filter((actorUri) =>
      newInvitations[actorUri].includes('share')
    );
    if (actorsWithNewShareRight.length > 0) {
      await outbox.post({
        type: ACTIVITY_TYPES.OFFER,
        actor: outbox.owner,
        object: {
          type: ACTIVITY_TYPES.ANNOUNCE,
          object: resourceUri,
        },
        target: actorsWithNewShareRight,
        to: actorsWithNewShareRight,
      });
    }
    
    if (pendingPublicState === true && currentPublicState === false) {
      addPermission('foaf:Agent', 'acl:agentClass', 'acl:Read');
    } else if (pendingPublicState === false && currentPublicState === true) {
      removePermission('foaf:Agent', 'acl:agentClass', 'acl:Read');
    }

    if (pendingGroupState === true && currentGroupState === false) {
      addPermission(syreenAclGroupUri, 'acl:agentGroup', 'acl:Read');
      addPermission(SYREEN_GROUP_URI, 'acl:agent', 'acl:Read');
      await outbox.post({
        type: ACTIVITY_TYPES.ANNOUNCE,
        actor: outbox.owner,
        object: resourceUri,
        target: SYREEN_GROUP_URI,
        to: SYREEN_GROUP_URI,
      });
    } else if (pendingGroupState === false && currentGroupState === true) {
      removePermission(syreenAclGroupUri, 'acl:agentGroup', 'acl:Read');
      removePermission(SYREEN_GROUP_URI, 'acl:agent', 'acl:Read');
    }
    
    const invitationMessage = (nbInvitations === 1)
      ? '1 invitation envoyée'
      : `${nbInvitations} invitations envoyées`;
    notify(invitationMessage);

    close();

  }, [outbox, notify, newInvitations, isOrganizer, close, record, resourceUri, setSendingInvitation, nbInvitations, syreenAclGroupUri, pendingPublicState, currentPublicState, pendingGroupState, currentGroupState, addPermission, removePermission]);
  
  if (!identity) return null;

  return (
    <Dialog fullWidth={!xs} open={true} onClose={close} classes={{ paper: classes.dialogPaper }}>
      <DialogTitle className={classes.title}>Partager l'annonce</DialogTitle>
      <DialogContent className={classes.listForm}>
        <ListBase
          resource="Profile"
          basePath="/Profile"
          perPage={1000}
          sort={{ field: 'vcard:given-name', order: 'ASC' }}
        >
          <ContactsShareList
            addInvitation={addInvitation}
            removeInvitation={removeInvitation}
            announces={announces}
            announcers={announcers}
            isOrganizer={isOrganizer}
            pendingPublicState={pendingPublicState}
            setPendingPublicState={setPendingPublicState}
            pendingGroupState={pendingGroupState}
            setPendingGroupState={setPendingGroupState}
          />
        </ListBase>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button variant="text" size="medium" onClick={close}>Fermer</Button>
        {nbInvitations > 0 && (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={sendInvitations}
            disabled={sendingInvitation}
          >
            {(nbInvitations <= 1) ? "Envoyer l'invitation" : `Envoyer ${nbInvitations} invitations`}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ShareDialog;
