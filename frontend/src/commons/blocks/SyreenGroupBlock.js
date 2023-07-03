import React from 'react';
import { Button, Box, Card, makeStyles, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import JoinSyreenGroupButton from "../buttons/JoinSyreenGroupButton";

const useStyles = makeStyles(() => ({
  groupButton: {
    float: 'right'
  }
}));

const SyreenGroupBlock = () => {
  const classes = useStyles();
  return (
    <Box mb={2}>
      <Card>
        <Box p={2}>
          <Button variant="contained" size="large" color="primary" component={Link} startIcon={<GroupAddIcon />} to="/join" className={classes.groupButton}>Rejoindre</Button>
          {/* <JoinSyreenGroupButton variant="contained" className={classes.groupButton} /> */}
          <Typography variant="h5">Professionnel ? Rejoignez le groupe Syreen</Typography>
          <Typography variant="body1">Bla bla bla, bla bla bli ! Bla bla bla, bla bla bli ! Bla bla bla, bla bla bli !</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default SyreenGroupBlock;
