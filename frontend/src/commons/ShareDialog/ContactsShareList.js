import React from 'react';
import { List, makeStyles, Box, CircularProgress } from '@material-ui/core';
import ContactItem from './ContactItem';
import ContactPublic from './ContactPublic';
import { useListContext } from 'react-admin';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
}));

const ContactsShareList = ({ addInvitation, removeInvitation, editPublicSetting, announces, announcers, isOrganizer, isPublic }) => {
  const classes = useStyles();
  const { ids, data, loading, ...rest } = useListContext();
  return (
    <List dense className={classes.list}>
      <ContactPublic
        key="public"
        editPublicSetting={editPublicSetting}
        isPublic={isPublic}
        {...rest}
      />
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
