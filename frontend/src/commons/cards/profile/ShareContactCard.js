import React from 'react';
import { makeStyles, Box, Card, Typography, TextField } from '@material-ui/core';
import { useGetIdentity } from 'react-admin';
import { formatUsername } from '../../../utils';
import CopyButton from '../../buttons/profile/CopyButton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 5,
    marginBottom: 24,
  },
  title: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `radial-gradient(circle at 50% 8em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    padding: '10px 14px',
    [theme.breakpoints.down('sm')]: {
      padding: '8px 16px',
    },
  },
  block: {
    backgroundColor: 'white',
  },
  textField: {
    paddingTop: 6,
  },
}));

const ShareContactCard = () => {
  const classes = useStyles();
  const { identity } = useGetIdentity();
  const contactLink = identity && new URL(window.location.href).origin + '/u/' + formatUsername(identity?.id);
  return (
    <Card className={classes.root}>
      <Box className={classes.title} p={2}>
        <Typography variant="h6">Mon lien de contact</Typography>
      </Box>
      <Box className={classes.block} p={2}>
        <Typography variant="body2">
          Pour vous connecter avec une personne que vous connaissez, vous pouvez lui envoyer le lien ci-dessous.
        </Typography>
        <TextField
          variant="filled"
          margin="dense"
          value={contactLink}
          fullWidth
          InputLabelProps={{ shrink: false }}
          InputProps={{ endAdornment: <CopyButton text={contactLink} />, classes: { input: classes.textField } }}
        />
      </Box>
    </Card>
  );
};

export default ShareContactCard;
