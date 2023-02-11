import React from 'react';
import {
  SimpleForm,
  NumberInput,
  TextInput,
  required,
  SelectInput
} from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import CameraInput from '../../commons/inputs/CameraInput';
import { concepts } from "./concepts";

const Form = (props) => {
  return (
    <SimpleForm {...props} redirect="show">
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <MarkdownInput source="pair:description" fullWidth validate={[required()]} isRequired />
      <CameraInput source="pair:depictedBy" />
      <NumberInput source="syreen:quantity" fullWidth />
      <SelectInput source="syreen:unit" fullWidth validate={[required()]} isRequired  choices={concepts.offerUnits} />
    </SimpleForm>
  );
};

export default Form;
