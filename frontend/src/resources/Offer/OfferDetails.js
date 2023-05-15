import React from 'react';
import { DateField, NumberField } from 'react-admin';
import IconsList from '../../commons/lists/IconsList';
import EventIcon from '@material-ui/icons/Event';
import ConceptField from '../../commons/fields/ConceptField';

const OfferDetails = (props) => {
  return (
    <IconsList {...props}>
      <DateField
        source="dc:created"
        locales={process.env.REACT_APP_LANG}
        options={{ year: 'numeric', month: 'long', day: 'numeric' }}
        icon={<EventIcon />}
      />
      <ConceptField reference="Stage" source="syreen:hasStage" />
      <NumberField source="syreen:quantity"/>
      <ConceptField reference="Unit" source="syreen:hasUnit" />
    </IconsList>
  );
};

export default OfferDetails;
