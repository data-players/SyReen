import React, { forwardRef } from 'react';
import { Link, UserMenu as RaUserMenu, useGetIdentity } from 'react-admin';
import { Box, MenuItem as MuiMenuItem, ListItemIcon, makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
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

const MenuItem = ({ primaryText, leftIcon }) => {
  const classes = useStyles();
  return (
    <MuiMenuItem className={classes.menuItem} activeClassName={classes.active}>
      <ListItemIcon className={classes.icon}>{leftIcon}</ListItemIcon>
      {primaryText}
    </MuiMenuItem>
  );
};

const OutsideMenuItemLink = ({ ...props }) => (
  <a href={props.to}><MenuItem {...props} /></a>
);

const InsideMenuItemLink = ({ ...props }) => (
  <Link to={props.to}><MenuItem {...props} /></Link>
);

const LoginMenu = forwardRef(({ onClick, label }, ref) => (
  <OutsideMenuItemLink ref={ref} to="/login" primaryText={label} onClick={onClick} />
));

const UserMenu = ({ logout, ...otherProps }) => {
  const classes = useStyles();
  const { identity } = useGetIdentity();
  return (
    <Box className={classes.userMenuContainer}>
      <RaUserMenu {...otherProps}>
        {identity && identity.id !== '' ? (
          [
            <InsideMenuItemLink 
              to={"/Profile/" + encodeURIComponent(identity?.profileData?.id)}
              primaryText="Mon profil"
              leftIcon={<PersonIcon />}
            />,
            <InsideMenuItemLink
              to={"/Location"}
              primaryText="Mes adresses"
              leftIcon={<HomeIcon />}
            />,
            <InsideMenuItemLink
              to={"/Profile"}
              primaryText="Mon réseau"
              leftIcon={<GroupIcon />}
            />,
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
