import React, { useCallback, useState } from 'react';
import { makeStyles, Avatar, Switch, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 4,
    borderBottom: '1px solid grey'
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

const ContactPublic = ({ record, editPublicSetting, isPublic }) => {
  const classes = useStyles();

  const [viewChecked, setViewChecked] = useState(isPublic);

  const switchView = useCallback(() => {
    if (!viewChecked) {
      setViewChecked(true);
      editPublicSetting({action:'add'});
    } else {
      setViewChecked(false);
      editPublicSetting({action:'remove'});
    }
  }, [viewChecked, setViewChecked, editPublicSetting]);

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar className={classes.avatarItem}>
        <Avatar src="" className={classes.avatar}>
        <PublicIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.primaryText}
        primary="Rendre l'offre publique"
      />
      <ListItemText
        className={classes.secondaryText}
        secondary={<Switch size="small" checked={viewChecked} onChange={switchView} />}
      />
      <ListItemText
        className={classes.secondaryText}
      />
    </ListItem>
  );
};

export default ContactPublic;
