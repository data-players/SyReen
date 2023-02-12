import React from 'react';
import { SelectField, DateField, NumberField } from 'react-admin';
import IconsList from '../../commons/lists/IconsList';
import EventIcon from '@material-ui/icons/Event';
import { concepts } from "./concepts";

const OfferDetails = (props) => {
  return (
    <IconsList {...props}>
      <DateField
        source="dc:created"
        locales={process.env.REACT_APP_LANG}
        options={{ year: 'numeric', month: 'long', day: 'numeric' }}
        icon={<EventIcon />}
      />
      <SelectField source="syreen:phase" choices={concepts.offerPhases} />
      <NumberField source="syreen:quantity"/>
      <SelectField source="syreen:unit" choices={concepts.offerUnits} />
    </IconsList>
  );
};

export default OfferDetails;
