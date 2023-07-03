import React from 'react';
import { List, makeStyles, Box, CircularProgress } from '@material-ui/core';
import ContactItem from './ContactItem';
import PublicSwitch from './PublicSwitch';
import { useListContext } from 'react-admin';
import Alert from '@material-ui/lab/Alert';
import SyreenGroupSwitch from "./SyreenGroupSwitch";
import useSyreenGroupMember from "../../hooks/useSyreenGroupMember";

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
}));

const ContactsShareList = ({ addInvitation, removeInvitation, announces, announcers, isOrganizer, pendingPublicState, setPendingPublicState, currentGroupState, pendingGroupState, setPendingGroupState }) => {
  const classes = useStyles();
  const { ids, data, loading, ...rest } = useListContext();
  const { isMember } = useSyreenGroupMember();
  return (
    <List dense className={classes.list}>
      <PublicSwitch
        key="public"
        pendingPublicState={pendingPublicState}
        setPendingPublicState={setPendingPublicState}
      />
      {isMember &&
        <SyreenGroupSwitch
          key="group"
          currentGroupState={currentGroupState}
          pendingGroupState={pendingGroupState}
          setPendingGroupState={setPendingGroupState}
        />
      }
      {ids.map((id, i) => (
        <ContactItem
          key={i}
          record={data[id]}
          addInvitation={addInvitation}
          removeInvitation={removeInvitation}
          canView={announces.includes(data[id].describes)}
          canShare={announcers.includes(data[id].describes)}
          isOrganizer={isOrganizer}
          {...rest}
        />
      ))}
      {loading && (
        <Box display="flex" alignItems="center" justifyContent="center" height={250}>
          <CircularProgress size={60} thickness={6} />
        </Box>
      )}
      {!loading && ids.length === 0 && <Alert severity="warning">Vous devez ajouter des contacts à votre réseau pour pouvoir les inviter</Alert>}
    </List>
  );
};

export default ContactsShareList;
