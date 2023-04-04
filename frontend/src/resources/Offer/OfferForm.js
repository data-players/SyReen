import React from 'react';
import {
  SimpleForm,
  NumberInput,
  TextInput,
  required
} from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import CameraInput from '../../commons/inputs/CameraInput';
import LocationInput from "../../commons/inputs/LocationInput";
import ConceptInput from "../../commons/inputs/ConceptInput";

const OfferForm = (props) => {
  return (
    <SimpleForm {...props} redirect="show">
      <TextInput source="syreen:label" fullWidth validate={[required()]} />
      <ConceptInput reference="Stage" source="syreen:hasStage" validate={[required()]} isRequired fullWidth />
      <MarkdownInput source="syreen:description" fullWidth validate={[required()]} isRequired />
      <CameraInput source="syreen:depictedBy" />
      <LocationInput reference="Location" source="pair:hasLocation" fullWidth />
      <MarkdownInput source="syreen:locationInformation" fullWidth />
      <NumberInput source="syreen:quantity" fullWidth validate={[required()]} isRequired />
      <ConceptInput reference="Unit" source="syreen:hasUnit" validate={[required()]} isRequired fullWidth />
    </SimpleForm>
  );
};

export default OfferForm;
