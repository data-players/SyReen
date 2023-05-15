import React from 'react';
import {CreateBase} from 'react-admin';
import OfferForm from './OfferForm';
import CreatePage from '../../layout/CreatePage';
import ReturnToProjectButton from "../../commons/buttons/ReturnToProjectButton";

const OfferCreate = (props) => {
  return (
    <CreateBase {...props}>
      <CreatePage title="Créer une offre" actions={[<ReturnToProjectButton key="returnToProject" />]}>
        <OfferForm component="div" />
      </CreatePage>
    </CreateBase>
  );
}

export default OfferCreate;
