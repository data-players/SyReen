import React from 'react';
import { SelectField, DateField, useRecordContext, useShowContext } from 'react-admin';
import IconsList from '../../commons/lists/IconsList';
import EventIcon from '@material-ui/icons/Event';
import NaturePeopleOutlinedIcon from '@material-ui/icons/NaturePeopleOutlined';
import SyncIcon from '@material-ui/icons/Sync';
import { types, resourceTypes } from '../../config/constants';
import { concepts } from "./concepts";

const Details = (props) => {
  return (
    <IconsList {...props}>
      {/*
      <SelectField
        source="type"
        label="app.input.exchange_type"
        choices={Object.entries(types).map(([k, v]) => ({ id: k, name: v }))}
        icon={<SyncIcon />}
      />
      <SelectField
        source="mp:offerOfResourceType"
        label="app.input.resource_type"
        choices={Object.entries(resourceTypes).map(([k, v]) => ({ id: k, name: v }))}
        icon={<NaturePeopleOutlinedIcon />}
      />
      */}
      <DateField
        source="dc:created"
        locales={process.env.REACT_APP_LANG}
        options={{ year: 'numeric', month: 'long', day: 'numeric' }}
        icon={<EventIcon />}
      />
      <SelectField source="syreen:type" choices={concepts.projectTypes} />
      <SelectField source="syreen:status" choices={concepts.projectStatus} />

    </IconsList>
  );
};

export default Details;