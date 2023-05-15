import React from 'react';
import { TextField } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';

const ConceptField = (props) => {
  return (
    <ReferenceField link={false} {...props}>
      <TextField source="syreen:label" />
    </ReferenceField>
  );
};

export default ConceptField;
