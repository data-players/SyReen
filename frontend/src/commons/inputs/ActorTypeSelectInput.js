import React from "react";
import { SelectInput } from "react-admin";

const actorTypes = [
  { name: 'Un artisan' },
  { name: 'Un bureau d’étude, un architecte un AMOE' },
  { name: 'Une collectivité' },
  { name: 'Un distributeur' },
  { name: 'Un acteur du déchet' },
];


const ActorTypeSelectInput = props => (
  <SelectInput {...props} translateChoice={false} optionValue="name" choices={actorTypes} />
);

export default ActorTypeSelectInput;
