import React from 'react';
import { DeleteWithConfirmButton, SaveButton, Toolbar as RaToolbar, useNotify, useDataProvider, useRecordContext, useRedirect } from 'react-admin';
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
  const dataProvider = useDataProvider();
  const recordContext = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const onSaveSuccess = ({data}) => {
    notify('Elément enregistré', 'success', null, true);
    redirect('create', '/offers', null, {}, { record: {
      'pair:partOf': recordContext.id || data.id,
      'pair:hasLocation': recordContext['pair:hasLocation'] || data['pair:hasLocation']
    }});
  };
  const onDeleteSuccess = ({data}) => {
    dataProvider
      .getList('offers', { filter: {'pair:partOf':recordContext.id} })
      .then(({ data:offers }) => {
        dataProvider.deleteMany('offers', {ids: offers.map(offer => offer.id)})
        notify('Projet supprimé', 'success', null, true);
      })
      .catch(e => {
        notify('Erreur lors de la suppression', 'error', null, true);
      })
      redirect('list', '/projects');
  };
  return (
    <Box className={classes.root}>
      <RaToolbar {...props}>
        <SaveButton className={classes.saveButton} disabled={props.pristine} />
        <SaveButton
          className={classes.saveAndAddButton }
          label={xs ? "+offre" : "Enregistrer et créer une offre"}
          onSuccess={onSaveSuccess}
          disabled={props.pristine} />
        <DeleteWithConfirmButton
          className={classes.deleteButton}
          onSuccess={onDeleteSuccess}
          confirmTitle={`Suppression du projet "${recordContext['syreen:label']}"`}
          confirmContent="Etes vous sûr de vouloir supprimer le projet et toutes ces offres ?"
        />
      </RaToolbar>
    </Box>
  );
}

export default ProjectToolbar;