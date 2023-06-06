import React from 'react';
import { Container } from '@material-ui/core';
import { ListBase } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import CardsList from '../../commons/lists/CardsList';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  useCheckAuthenticated();
  return (
    <Container maxWidth="md">
      <ListBase
        resource="projects"
        basePath="/projects"
        perPage={1000}
        sort={{ field: 'dc:created', order: 'DESC' }}
      >
        <CardsList CardComponent={ProjectCard} link="show" showCreatorItemsOnly={true} />
      </ListBase>
    </Container>
  );
};

export default ProjectList;
