import React from 'react';
import { EditBase } from 'react-admin';
import ProjectForm from './ProjectForm';
import EditPage from '../../layout/EditPage';
import Title from '../Title';
import ShowButton from '../../commons/buttons/ShowButton';
import ProjectToolbar from './ProjectToolbar';

const ProjectEdit = (props) => (
  <EditBase {...props}>
    <EditPage title={<Title />} actions={<ShowButton />} customToolbar={<ProjectToolbar />}>
      <ProjectForm component="div" />
    </EditPage>
  </EditBase>
);

export default ProjectEdit;
