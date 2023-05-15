import React from 'react';
import { Box, Card, makeStyles, Typography } from "@material-ui/core";
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
          <JoinSyreenGroupButton variant="contained" className={classes.groupButton} />
          <Typography variant="h5">Professionnel ? Rejoignez le groupe Syreen</Typography>
          <Typography variant="body1">Bla bla bla, bla bla bli ! Bla bla bla, bla bla bli ! Bla bla bla, bla bla bli !</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default SyreenGroupBlock;
