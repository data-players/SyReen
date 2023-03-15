import React from 'react';
import { Link, Notification } from 'react-admin';
import { useLocation } from 'react-router-dom';
import { Box, ThemeProvider, makeStyles } from '@material-ui/core';
import AppBar from './AppBar';
import TopAppBar from './TopAppBar';
import ScrollToTop from './ScrollToTop';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import WorkIcon from '@material-ui/icons/Work';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles((theme) => ({
  bottomNavigation: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    borderTop: '1px solid lightgrey',
    '& .MuiBottomNavigationAction-root': {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  container: {
    marginBottom: 100
  }
}));

const Layout = ({ logout, theme, children, title }) => {
  const classes = useStyles();
  const [navigationValue, setNavigationValue] = React.useState(0);
  const {pathname} = useLocation();
  const urlParts = pathname.split('/');
  if (urlParts[1]) {
    switch (urlParts[1]) {
      case 'projects' : if(navigationValue!==1) setNavigationValue(1); break;
      case 'offers'   : if(navigationValue!==0) setNavigationValue(0); break;
      case 'Profile'  : if(navigationValue!==2) setNavigationValue(2); break;
      case 'Location' : if(navigationValue!==2) setNavigationValue(2); break;
      default:          if(navigationValue!==0) setNavigationValue(0);
    }
  }
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
        value={navigationValue}
        showLabels
        className={classes.bottomNavigation}
      >
        <BottomNavigationAction label="Accueil" icon={<HomeIcon />} component={Link} to="/" />
        <BottomNavigationAction label="Mes projets" icon={<WorkIcon />} component={Link} to="/projects" />
        <BottomNavigationAction label="Mon réseau" icon={<GroupIcon />} component={Link} to="/Profile" />
        <BottomNavigationAction label="Mes alertes" icon={<NotificationsIcon />} component={Link} to="/alerts" />
      </BottomNavigation>
    </ThemeProvider>
  );
}

export default Layout;
