import React from 'react';
import {NumberInput, required, ReferenceInput, SimpleForm, TextInput, useGetIdentity} from 'react-admin';
import { LocationInput } from "@semapps/geo-components";
import TreeAutocompleteInput from "../../commons/inputs/TreeAutocompleteInput";

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
      <ReferenceInput reference="BatiprixCategory" source="syreen:hasBatiprixCategory" fullWidth >
        <TreeAutocompleteInput
          optionText="syreen:label"
          parentProperty="skos:broader"
          treeReference="BatiprixCategory"
          resettable={true} 
          shouldRenderSuggestions={value => true} 
          defaultExpanded={true}
        />
      </ReferenceInput>
    </SimpleForm>
  );
}

export default AlertForm;
