import React, { useCallback } from 'react';
import { makeStyles, Avatar, Switch, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';

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

const SyreenGroupSwitch = ({ currentGroupState, pendingGroupState, setPendingGroupState }) => {
  const classes = useStyles();

  const switchView = useCallback(() => {
    if (!pendingGroupState) {
      setPendingGroupState(true);
    } else {
      setPendingGroupState(false);
    }
  }, [pendingGroupState, setPendingGroupState]);

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar className={classes.avatarItem}>
        <Avatar src="" className={classes.avatar}>
          <GroupIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.primaryText}
        primary="Groupe SyRéeN"
      />
      <ListItemText
        className={classes.secondaryText}
        primary="Voir l'annonce"
        secondary={<Switch size="small" checked={pendingGroupState} onChange={switchView} disabled={currentGroupState} />}
      />
      <ListItemText
        className={classes.secondaryText}
      />
    </ListItem>
  );
};

export default SyreenGroupSwitch;
