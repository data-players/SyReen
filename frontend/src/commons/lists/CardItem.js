import React, { useMemo } from 'react';
import { linkToRecord, Link, DateField } from 'react-admin';
import { Box, Card, CardMedia, CardContent, makeStyles } from '@material-ui/core';
import PublicIcon from '@material-ui/icons/Public';
import { useAgents } from '@semapps/auth-provider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // marginTop: 5,
  },
  details: {
    display: 'flex',
    marginBottom: 15,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  image: {
    width: 180,
    minWidth: 180,
    minHeight: 145,
    backgroundColor: theme.palette.grey['300'],
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  date: {
    width: 180,
    minWidth: 180,
    minHeight: 145,
    backgroundImage: `radial-gradient(circle at 50% 14em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    padding: 0,
    color: 'white',
  },
  day: {
    fontSize: 50,
    lineHeight: 1.3,
  },
  content: {
    flex: '1 0 auto',
    flexShrink: 1,
    paddingTop: 10,
    paddingBottom: '16px !important',
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
  },
  publicIconContainer: {
    position: 'relative'
  },
  publicIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '50%'
  }
}));

const CardItem = ({ record, CardComponent, link }) => {
  const classes = useStyles();
  const { agents } = useAgents(record.id);
  const basePath = useMemo(() => record.type.endsWith('Offer') ? '/offers' : '/projects', [record]);
  const image = useMemo(() => record['pair:depictedBy'], [record]);
  const isPublic = useMemo(() => agents["foaf:Agent"]?.permissions.includes('acl:Read'), [agents]);
  return (
    <Link key={record.id} to={linkToRecord(basePath, record.id, link)} className={classes.root}>
      <Card key={record.id} className={classes.details}>
        {image ? (
          <CardMedia className={classes.image} image={Array.isArray(image) ? image[0] : image} />
        ) : (
          <CardContent className={classes.date}>
            <DateField record={record} variant="subtitle1" source="dc:created" locales={process.env.REACT_APP_LANG} options={{ weekday: 'long' }} />
            <DateField
              record={record}
              variant="h4"
              source="dc:created"
              locales={process.env.REACT_APP_LANG}
              options={{ day: 'numeric' }}
              className={classes.day}
            />
            <DateField record={record} variant="subtitle1" source="dc:created" locales={process.env.REACT_APP_LANG} options={{ month: 'long' }} />
          </CardContent>
        )}
        <CardContent className={classes.content}>
          <CardComponent record={record} />
        </CardContent>
        { isPublic &&
          <Box className={classes.publicIconContainer}>
            <PublicIcon className={classes.publicIcon} titleAccess="Offre publique" />
          </Box>
        }
      </Card>
    </Link>
  );
};

CardItem.defaultProps = {
  link: 'show',
};

export default CardItem;
