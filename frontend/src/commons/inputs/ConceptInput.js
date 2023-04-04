import React from 'react';
import { SelectInput } from 'react-admin';
import { ReferenceInput } from '@semapps/input-components';

const ConceptInput = (props) => (
  <ReferenceInput {...props}>
    <SelectInput optionText="syreen:label" />
  </ReferenceInput>
);

export default ConceptInput;
