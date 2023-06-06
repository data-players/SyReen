import React from 'react';
import {NumberInput, required, SimpleForm, TextInput, useGetIdentity} from 'react-admin';
import { LocationInput } from "@semapps/geo-components";
import ConceptInput from "../../commons/inputs/ConceptInput";

export const AlertForm = (props) => {
  const { identity } = useGetIdentity();
  if (!identity?.id) return null;
  return (
    <SimpleForm {...props} initialValues={{ 'syreen:actor': identity.id, 'syreen:radius': 50 }} redirect="list">
      <TextInput source="syreen:label" fullWidth />
      <LocationInput
        mapboxConfig={{
          access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
          types: ['place', 'address'],
          country: ['fr', 'be', 'ch'],
        }}
        source="syreen:hasAddress"
        parse={(value) => ({
          type: 'vcard:Address',
          'vcard:given-name': value.place_name,
          'vcard:longitude': value.center[0],
          'vcard:latitude': value.center[1],
        })}
        optionText={(resource) => resource['vcard:given-name']}
        fullWidth
      />
      <NumberInput source="syreen:radius" fullWidth validate={[required()]} isRequired />
      <ConceptInput
        reference="Category"
        source="syreen:hasCategory"
        sort={{ field:"syreen:label", order:"ASC" }}
        fullWidth
        autocomplete
      />
    </SimpleForm>
  );
}

export default AlertForm;
