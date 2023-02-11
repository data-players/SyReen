import React from 'react';
import {CreateBase, useTranslate} from 'react-admin';
import OfferForm from './OfferForm';
import CreatePage from '../../layout/CreatePage';
import ReturnToProjectButton from "../../commons/buttons/ReturnToProjectButton";

const Create = (props) => {
  const translate = useTranslate();
  return (
    <CreateBase {...props}>
      <CreatePage title={translate("app.action.create_offer")} actions={[<ReturnToProjectButton />]}>
        <OfferForm component="div" />
      </CreatePage>
    </CreateBase>
  );
}

export default Create;
