import React from 'react';
import {
  makeStyles,
  Container,
  Box,
  Button,
} from '@material-ui/core';
import { useGetIdentity } from 'react-admin';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: 16,
    },
  }
}));

const AppBar = ({ title }) => {
  const classes = useStyles();
  const location = useLocation();
  const { identity } = useGetIdentity();
  // const isProjectListView = location?.pathname?.match('^/projects/?$');
  // const isProjectEditOrShowView = location?.pathname?.match('^/projects/.*.+$');
  const isProjectView = location?.pathname?.match('^/projects.*$');
  return (
    <Container maxWidth="md">
      <Box mb={2} sx={{ textAlign: "right" }}>
      {isProjectView && identity?.id &&
        <Link to="/projects/create">
          <Button variant="contained" className={classes.button}>
            Créer un projet
          </Button>
        </Link>
      }
      </Box>
    </Container>
  );
};

export default AppBar;
