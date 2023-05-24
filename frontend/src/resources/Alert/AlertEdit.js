import React from 'react';
import { EditBase } from "react-admin";
import AlertForm from './AlertForm';
import Title from "../Title";
import BlockAnonymous from "../../commons/BlockAnonymous";
import EditPage from "../../layout/EditPage";

export const AlertEdit = (props) => (
  <BlockAnonymous>
    <EditBase {...props}>
      <EditPage title={<Title />} hasShow={false}>
        <AlertForm />
      </EditPage>
    </EditBase>
  </BlockAnonymous>
);

export default AlertEdit;
