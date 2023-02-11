import React from 'react';
import {
  SimpleForm,
  NumberInput,
  TextInput,
  required,
  SelectInput
} from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ReferenceInput } from '@semapps/input-components';
import CameraInput from '../../commons/inputs/CameraInput';
import { concepts } from "./concepts";

const Form = (props) => {
  return (
    <SimpleForm {...props} redirect="show">
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <SelectInput source="syreen:phase" choices={concepts.offerPhases} fullWidth validate={[required()]} isRequired />
      <MarkdownInput source="pair:description" fullWidth validate={[required()]} isRequired />
      <CameraInput source="pair:depictedBy" />
      <ReferenceInput reference="Location" source="pair:hasLocation" fullWidth>
        <SelectInput optionText="vcard:given-name" />
      </ReferenceInput>
      <MarkdownInput source="syreen:locationInformation" fullWidth />
      <NumberInput source="syreen:quantity" fullWidth validate={[required()]} isRequired />
      <SelectInput source="syreen:unit" fullWidth validate={[required()]} isRequired choices={concepts.offerUnits} />
    </SimpleForm>
  );
};

export default Form;
