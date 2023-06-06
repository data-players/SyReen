import React from 'react';
import {CreateBase} from 'react-admin';
import AlertForm from './AlertForm';
import CreatePage from '../../layout/CreatePage';

const OfferCreate = (props) => {
  return (
    <CreateBase {...props}>
      <CreatePage title="Créer une alerte">
        <AlertForm component="div" />
      </CreatePage>
    </CreateBase>
  );
}

export default OfferCreate;
