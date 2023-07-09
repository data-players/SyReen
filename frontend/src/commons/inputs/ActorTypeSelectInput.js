import React from "react";
import { SelectInput } from "react-admin";

const actorTypes = [
  { name: 'Un.e artisan.e' },
  { name: 'Un bureau d’étude, un.e architecte, un.e AMO' },
  { name: 'Une collectivité' },
  { name: 'Un distributeur' },
  { name: 'Une recyclerie' },
  { name: 'Un acteur du déchet' },
  { name: 'Autre' }
];

const ActorTypeSelectInput = props => (
  <SelectInput {...props} translateChoice={false} optionValue="name" choices={actorTypes} />
);

export default ActorTypeSelectInput;
