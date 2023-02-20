import React from 'react';
import {CreateBase} from 'react-admin';
import ProjectForm from './ProjectForm';
import CreatePage from '../../layout/CreatePage';
import ProjectToolbar from './ProjectToolbar';

const ProjectCreate = (props) => {
  return (
    <CreateBase {...props}>
      <CreatePage title="Créer un projet" customToolbar={<ProjectToolbar />}>
        <ProjectForm component="div" />
      </CreatePage>
    </CreateBase>
  );
}

export default ProjectCreate;
