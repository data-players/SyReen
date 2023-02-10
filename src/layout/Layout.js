import React from 'react';
import { Link, Notification } from 'react-admin';
import { Box, ThemeProvider, makeStyles } from '@material-ui/core';
import AppBar from './AppBar';
import TopAppBar from './TopAppBar';
import ScrollToTop from './ScrollToTop';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import WorkIcon from '@material-ui/icons/Work';

const useStyles = makeStyles((theme) => ({
  bottomNavigation: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    borderTop: '1px solid lightgrey'
  },
  container: {
    marginBottom: 57
  }
}));

const Layout = ({ logout, theme, children, title }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <TopAppBar logout={logout} />
      <Box mt={{ xs: 3, sm: 5 }} mb={{ xs: 2, sm: 5 }} className={classes.container}>
        <AppBar title={title} />
        {children}
      </Box>
      {/* Required for react-admin optimistic update */}
      <Notification />
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.bottomNavigation}
      >
        <BottomNavigationAction label="Accueil" icon={<HomeIcon />} component={Link} to="/" />
        <BottomNavigationAction label="Mes projets" icon={<WorkIcon />} component={Link} to="/projects" />
        <BottomNavigationAction label="Mes alertes" icon={<NotificationsIcon />} component={Link} to="/alerts" />
      </BottomNavigation>
    </ThemeProvider>
  );
}

export default Layout;
