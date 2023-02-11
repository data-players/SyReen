import React from 'react';
import { EditBase } from 'react-admin';
import OfferForm from './OfferForm';
import EditPage from '../../layout/EditPage';
import Title from '../Title';
import ShowButton from '../../commons/buttons/ShowButton';
import ReturnToProjectButton from "../../commons/buttons/ReturnToProjectButton";

const Edit = (props) => (
  <EditBase {...props}>
    <EditPage title={<Title />} actions={[<ReturnToProjectButton />, <ShowButton />]}>
      <OfferForm component="div" />
    </EditPage>
  </EditBase>
);

export default Edit;
