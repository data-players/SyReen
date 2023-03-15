import React from 'react';
import { Box, Button, makeStyles, Typography, ThemeProvider } from '@material-ui/core';
import { useGetIdentity, useTranslate, Link } from 'react-admin';
import { Redirect } from 'react-router-dom';
import theme from '../config/theme';
import AppIcon from '../config/AppIcon';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '1px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `radial-gradient(circle at 50% 14em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    '& p': {
      color: '#000'
    }
  },
  description: {
    color: 'white',
    fontStyle: 'italic',
    marginTop: 16,
    whiteSpace: 'pre-line',
  },
  button: {
    margin: 5,
  },
  logo: {
    '& img': {
      borderRadius: 4
    }
  }
}));

const HomePage = () => {
  const classes = useStyles();
  const { loading, identity } = useGetIdentity();
  const translate = useTranslate();

  if (loading) return null;

  return identity?.id ? (
    <Redirect to="/offers" />
  ) : (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Box className={classes.logo}><AppIcon /></Box>
        <Typography align="center" className={classes.description}>
          {process.env.REACT_APP_DESCRIPTION}
        </Typography>
        <Box display="flex" pt={3} pb={3} alignItems="center">
          <Link to="/login?signup">
            <Button variant="contained" color="secondary" className={classes.button}>
              {translate('auth.action.signup')}
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="contained" color="secondary" className={classes.button}>
              {translate('ra.auth.sign_in')}
            </Button>
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
