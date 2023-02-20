import React from 'react';
import { EditBase } from 'react-admin';
import ProjectForm from './ProjectForm';
import EditPage from '../../layout/EditPage';
import Title from '../Title';
import ShowButton from '../../commons/buttons/ShowButton';
import ProjectToolbar from './ProjectToolbar';
import AddOfferButton from "../../commons/buttons/AddOfferButton";

const ProjectEdit = (props) => (
  <EditBase {...props}>
    <EditPage title={<Title />} actions={[<AddOfferButton key="addOffer" />, <ShowButton key="show" />]} customToolbar={<ProjectToolbar />}>
      <ProjectForm component="div" />
    </EditPage>
  </EditBase>
);

export default ProjectEdit;
