import React, { useCallback, useState } from 'react';
import { makeStyles, Avatar, Switch, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: 0,
    paddingRight: 0
  },
  primaryText: {
    width: '30%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexBasis: '100%',
  },
  secondaryText: {
    textAlign: 'center',
    width: '60%',
    fontStyle: 'italic',
    color: 'grey',
  },
  avatarItem: {
    minWidth: 50,
  },
  avatar: {
    backgroundImage: `radial-gradient(circle at 50% 3em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  },
}));

const PublicSwitch = ({ pendingPublicState, setPendingPublicState }) => {
  const classes = useStyles();

  const switchView = useCallback(() => {
    if (!pendingPublicState) {
      setPendingPublicState(true);
    } else {
      setPendingPublicState(false);
    }
  }, [pendingPublicState, setPendingPublicState]);

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar className={classes.avatarItem}>
        <Avatar src="" className={classes.avatar}>
        <PublicIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.primaryText}
        primary="Tout le monde"
      />
      <ListItemText
        className={classes.secondaryText}
        primary="Voir l'annonce"
        secondary={<Switch size="small" checked={pendingPublicState} onChange={switchView} />}
      />
      <ListItemText
        className={classes.secondaryText}
      />
    </ListItem>
  );
};

export default PublicSwitch;
