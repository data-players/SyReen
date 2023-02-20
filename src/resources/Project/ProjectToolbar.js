import React from 'react';
import { DeleteButton, SaveButton, Toolbar as RaToolbar, useNotify, useRecordContext, useRedirect } from 'react-admin';
import { Box, makeStyles, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiToolbar-root': {
      paddingRight: 14,
      paddingLeft: 14,
      '@media (max-width:360px)': {
        paddingRight: 4,
        paddingLeft: 4
      }
    }
  },
  saveButton: {
    minWidth: 148,
    marginRight: 8,
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
      '& svg': {

      }
    }
  },
  saveAndAddButton: {
    maxWidth: 'unset',
    height: 42,
    marginRight: 8,
    lineHeight: '16px',
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      textOverflow: 'ellipsis'
    }
  },
  deleteButton: {
    minWidth: 110,
    marginLeft: 'auto',
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
    }
  }
}));

const ProjectToolbar = (props) => {
  const classes = useStyles();
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  const recordContext = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const onSuccess = ({data}) => {
    notify('Elément enregistré', 'success', null, true);
    redirect('create', '/offers', null, {}, { record: {
      'pair:partOf': recordContext.id || data.id,
      'pair:hasLocation': recordContext['pair:hasLocation'] || data['pair:hasLocation']
    }});
  };
  return (
    <Box className={classes.root}>
      <RaToolbar {...props}>
        <SaveButton className={classes.saveButton} disabled={props.pristine} />
        <SaveButton
          className={classes.saveAndAddButton }
          label={xs ? "+offre" : "Enregistrer et créer une offre"}
          onSuccess={onSuccess}
          disabled={props.pristine} />
        <DeleteButton className={classes.deleteButton } />
      </RaToolbar>
    </Box>
  );
}

export default ProjectToolbar;