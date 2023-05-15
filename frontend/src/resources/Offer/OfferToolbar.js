import React, { useCallback } from 'react';
import { DeleteButton, SaveButton, Toolbar as RaToolbar, useNotify, useRecordContext, useRedirect, resolveRedirectTo } from 'react-admin';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  deleteButton: {
    marginLeft: 'auto',
  }
}));

const OfferToolbar = (props) => {
  const classes = useStyles();

  const recordContext = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  
  const onSuccess = useCallback( (message) => {
    notify(message, 'success', null, true);
    redirect(resolveRedirectTo('show', '/projects', recordContext['syreen:partOf'], {}, {tab:1} ) + '/1');
  }, [recordContext, notify, redirect])

  return (
    <RaToolbar {...props}>
      <SaveButton onSuccess={() => onSuccess('Offre modifiée')} />
      <DeleteButton onSuccess={() => onSuccess('Offre supprimée')} className={classes.deleteButton} />
    </RaToolbar>
  );
}

export default OfferToolbar;


