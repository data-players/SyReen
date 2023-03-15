import React from 'react';
import { Link } from 'react-admin';
import { Box, Container, Grid, IconButton, makeStyles, Typography, AppBar as MuiAppBar, Toolbar } from '@material-ui/core';
import UserMenu from './UserMenu';
import AppIcon from '../config/AppIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: 'unset',
  },
  toolbar: {
    height: 64,
    padding: 0
  },
  menuButton: {
    color: 'white',
  },
  title: {
    flexGrow: 1,
    '& a': {
      color: 'white',
      textDecoration: 'none',
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    margin: 0
  },
  logo: {
    marginLeft: 0,
    marginRight: 8,
    height: 56,
    padding: 4,
    '& > *': {
      height: '100%',
    },
    '& img': {
      maxHeight: '100%',
      borderRadius: 4
    }
  },
  userMenu: {
    fontSize: 64
  },
}));

const TopAppBar = ({ logout }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <MuiAppBar position="static" className={classes.root}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box mb={1} className={classes.logoContainer}>
                <Link to="/">
                  <IconButton edge="start" className={classes.logo} color="inherit">
                    <AppIcon />
                  </IconButton>
                </Link>
                <Typography variant="h4" className={classes.title}>
                  <Link to="/">Syréen</Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <UserMenu logout={logout} />
        </Toolbar>
      </MuiAppBar>
    </Container>
  );
};

export default TopAppBar;
