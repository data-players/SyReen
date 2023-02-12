import React from 'react';
import { SelectField, DateField } from 'react-admin';
import IconsList from '../../commons/lists/IconsList';
import EventIcon from '@material-ui/icons/Event';
import { concepts } from "./concepts";

const ProjectDetails = (props) => {
  return (
    <IconsList {...props}>
      <DateField
        source="dc:created"
        locales={process.env.REACT_APP_LANG}
        options={{ year: 'numeric', month: 'long', day: 'numeric' }}
        icon={<EventIcon />}
      />
      <SelectField source="syreen:type" choices={concepts.projectTypes} />
    </IconsList>
  );
};

export default ProjectDetails;
