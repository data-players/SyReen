import React from 'react';
import { useRecordContext } from 'react-admin';
import { Grid, Avatar, makeStyles, Typography } from '@material-ui/core';
import { formatUsername } from '../../utils';

const useStyles = makeStyles((theme) => ({
  username: {
    fontStyle: 'italic',
  },
  note: {
    marginTop: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    [theme.breakpoints.down('xs')]: {
      width: 80,
      height: 80,
    },
  },
}));

const ProfileField = ({ label, source, ...rest }) => {
  const record = useRecordContext(rest);
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={4} md={2}>
        <Avatar src={record?.['vcard:photo']} alt={record?.['vcard:given-name']} className={classes.avatar} />
      </Grid>
      <Grid item xs={8} md={10}>
        <Typography variant="h4">{!record['_error'] ? record?.['vcard:given-name'] : "Inconnu"}</Typography>
        {!record['_error'] && 
          <Typography variant="body2" className={classes.username}>
            {formatUsername(record?.describes)}
          </Typography>
        }
        <Typography variant="body2" className={classes.note}>
          {!record['_error'] ? record?.['vcard:note'] : "Vous n'avez pas la permission de voir le profil de cette personne, mais vous pouvez lui écrire"}
        </Typography>
      </Grid>
    </Grid>
  );
};

ProfileField.defaultProps = {
  addLabel: true,
};

export default ProfileField;
