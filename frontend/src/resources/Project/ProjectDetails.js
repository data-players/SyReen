import React from 'react';
import { DateField } from 'react-admin';
import IconsList from '../../commons/lists/IconsList';
import EventIcon from '@material-ui/icons/Event';
import ConceptField from '../../commons/fields/ConceptField';

const ProjectDetails = (props) => {
  return (
    <IconsList {...props}>
      <DateField
        source="dc:created"
        locales={process.env.REACT_APP_LANG}
        options={{ year: 'numeric', month: 'long', day: 'numeric' }}
        icon={<EventIcon />}
      />
      <ConceptField reference="ProjectType" source="syreen:hasProjectType" />
    </IconsList>
  );
};

export default ProjectDetails;
