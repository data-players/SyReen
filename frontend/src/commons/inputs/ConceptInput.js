import React from 'react';
import { AutocompleteInput, SelectInput } from 'react-admin';
import { ReferenceInput } from '@semapps/input-components';
import SelectInputWithFilter from './SelectInputWithFilter';

const ConceptInput = (props) => {
  const hasConditionalfilter = props?.conditionalfilter?.id;
  if (props.autocomplete) {
    return (
      <ReferenceInput {...props} >
        <AutocompleteInput optionText="syreen:label" />
      </ReferenceInput>
    );
  } else {
    if (hasConditionalfilter) {
      return (
        <ReferenceInput {...props}>
          <SelectInputWithFilter {...props} />
        </ReferenceInput>
      );
    } else {
      return (
        <ReferenceInput {...props} >
          <SelectInput optionText="syreen:label" />
        </ReferenceInput>
      );
    }
  }
}

export default ConceptInput;
