import React from 'react';
import Edit from '../../layout/profile/Edit';
import LocationForm from './LocationForm';
import LocationTitle from "./LocationTitle";
import BlockAnonymous from "../../commons/BlockAnonymous";

export const LocationEdit = (props) => (
  <BlockAnonymous>
    <Edit title={<LocationTitle />} hasShow={false} {...props}>
      <LocationForm />
    </Edit>
  </BlockAnonymous>
);

export default LocationEdit;
