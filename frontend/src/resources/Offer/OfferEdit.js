import React from 'react';
import { EditBase } from 'react-admin';
import OfferForm from './OfferForm';
import OfferToolbar from './OfferToolbar';
import EditPage from '../../layout/EditPage';
import Title from '../Title';
import ShowButton from '../../commons/buttons/ShowButton';
import ReturnToProjectButton from "../../commons/buttons/ReturnToProjectButton";

const OfferEdit = (props) => (
  <EditBase {...props}>
    <EditPage title={<Title />} actions={[<ReturnToProjectButton key="returnToProject" />, <ShowButton key="show" />]} customToolbar={<OfferToolbar />}>
      <OfferForm component="div" />
    </EditPage>
  </EditBase>
);

export default OfferEdit;
