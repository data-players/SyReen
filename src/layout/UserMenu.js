import React, { forwardRef } from 'react';
import { UserMenu as RaUserMenu, useGetIdentity } from 'react-admin';
import { Box, MenuItem, ListItemIcon, makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import useOpenExternalApp from "../hooks/useOpenExternalApp";

const useStyles = makeStyles((theme) => ({
  a: {
    textDecoration: 'none'
  },
  menuItem: {
    color: theme.palette.text.secondary
  },
  active: {
    color: theme.palette.text.primary,
  },
  icon: { minWidth: theme.spacing(5) },
  userMenuContainer: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& button.MuiButtonBase-root': {
      [theme.breakpoints.down('sm')]: {
        minWidth: 'unset'
      }
    },
    '& span.MuiButton-label': {
      fontWeight: 600,
      fontSize: 0,
      marginRight: -12,
      [theme.breakpoints.up('sm')]: {
        fontSize: 20,
        marginRight: 0
      }
    },
    '& svg.MuiSvgIcon-root': {
      fontSize: 40
    },    
  }
}));

const OutsideMenuItemLink = ({ to, primaryText, leftIcon }) => {
  const classes = useStyles();
  return (
    <a href={to} className={classes.a}>
      <MenuItem className={classes.menuItem} activeClassName={classes.active}>
        <ListItemIcon className={classes.icon}>{leftIcon}</ListItemIcon>
        {primaryText}
      </MenuItem>
    </a>
  );
};

const MyProfileMenu = forwardRef(({ onClick, label, to }, ref) => (
  <OutsideMenuItemLink ref={ref} to={to} primaryText={label} leftIcon={<PersonIcon />} onClick={onClick} />
));

const MyAddressMenu = forwardRef(({ onClick, label, to }, ref) => (
  <OutsideMenuItemLink ref={ref} to={to} primaryText={label} leftIcon={<HomeIcon />} onClick={onClick} />
));

const MyNetworkMenu = forwardRef(({ onClick, label, to }, ref) => (
  <OutsideMenuItemLink ref={ref} to={to} primaryText={label} leftIcon={<GroupIcon />} onClick={onClick} />
));

const LoginMenu = forwardRef(({ onClick, label }, ref) => (
  <OutsideMenuItemLink ref={ref} to="/login" primaryText={label} onClick={onClick} />
));

const UserMenu = ({ logout, ...otherProps }) => {
  const classes = useStyles();
  const { identity } = useGetIdentity();
  const openExternalApp = useOpenExternalApp();
  return (
    <Box className={classes.userMenuContainer}>
      <RaUserMenu {...otherProps}>
        {identity && identity.id !== '' ? (
          [
            <MyProfileMenu
              key="my-profile"
              label='Mon profil'
              to={"/Profile/" + encodeURIComponent(identity?.profileData?.id)}
            />,
            /*
            <MyAddressMenu
              key="my-address"
              label='Mes adresses'
              to={openExternalApp('vcard:Location')}
            />,
            <MyNetworkMenu
              key="my-network"
              label='Mon réseau'
              to={openExternalApp('as:Profile')}
            />,
            */
            React.cloneElement(logout, { key: 'logout' }),
          ]
        ) : (
          <LoginMenu label="Se connecter" />
        )}
      </RaUserMenu>
    </Box>
  );
};

export default UserMenu;
