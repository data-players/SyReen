import React from 'react';
import { useShowContext } from 'react-admin';
import { Grid, Avatar, makeStyles } from '@material-ui/core';
import DetailsList from './DetailsList';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiGrid-container': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      }
    },
    '& .MuiGrid-root': {
      [theme.breakpoints.down('xs')]: {
        padding: 0,
        paddingTop: 8,
        paddingBottom: 4,
        margin: 0,
        maxWidth: '100%',
        '& p.MuiTypography-root div': {
          margin: 0
        },
        '& p.MuiTypography-root button': {
          padding: 0
        }
      },
    }
  },
  avatar: {
    width: 120,
    height: 120,
    margin: 'auto'
  }
}));

const Hero = ({ children, image, defaultImage }) => {
  const classes = useStyles();
  const { basePath, loaded, record, resource } = useShowContext();
  if (!loaded) return null;

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} sm={2}>
        <Avatar src={record[image]} className={classes.avatar} />
      </Grid>
      <Grid item xs={12} sm={10}>
        <DetailsList record={record} resource={resource} basePath={basePath}>
          {children}
        </DetailsList>
      </Grid>
    </Grid>
  );
};

export default Hero;
