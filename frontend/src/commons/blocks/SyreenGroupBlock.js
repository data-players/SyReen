import React from 'react';
import { Button, Box, Card, makeStyles, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import useSyreenGroupMember from '../../hooks/useSyreenGroupMember';

const useStyles = makeStyles(() => ({
  groupButton: {
    float: 'right'
  }
}));

const SyreenGroupBlock = () => {
  const classes = useStyles();
  const { isMember, loaded } = useSyreenGroupMember();
  // if (!loaded || isMember) return null;
  return (
    <Box mb={2}>
      <Card>
        <Box p={2}>
          <Button variant="contained" size="large" color="primary" component={Link} startIcon={<GroupAddIcon />} to="/join" className={classes.groupButton}>Rejoindre</Button>
          <Typography variant="h5">Professionnel ? Rejoignez le groupe Syreen</Typography>
          <Typography variant="body1">Vous souhaitez vous inscrire sur la plateforme SyRéeN au titre de votre activité professionnelle ? C'est ici que ça se passe-</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default SyreenGroupBlock;
