import React from 'react';
import { SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, useGetIdentity, required, TopToolbar } from "react-admin";
import { Typography } from '@material-ui/core';
import Edit from '../layout/profile/Edit';
import QuickCreateLocationInput from '../commons/inputs/QuickCreateLocationInput';
import PhoneInput from '../commons/inputs/PhoneInput';
import SendIcon from '@material-ui/icons/Send';

const actorTypes = [
  { name: 'Un artisan' },
  { name: 'Un bureau d’étude, un architecte un AMOE' },
  { name: 'Une collectivité' },
  { name: 'Un distributeur' },
  { name: 'Un acteur du déchet' },
];

const validPhone = (value) => {
  if (!value || !value['vcard:hasValue']) return undefined;
  if (!value['vcard:hasValue'].startsWith('tel:+') || isNaN(value['vcard:hasValue'].replace('tel:+',''))) {
      return 'Utiliser le format +3364 avec des chiffres et aucun espace';
  }
  return undefined;
};

const ToolbarWithoutDelete = props => (
  <Toolbar {...props} >
    <SaveButton label="Envoyer la demande" icon={<SendIcon />} />
  </Toolbar>
);

export const JoinGroupPage = (props) => {
  const { identity } = useGetIdentity();
  if (!identity?.id) return null;

  const join = (values) => {
    console.log('join', values)
  };

  return (
    <Edit
      resource="Profile"
      basePath="/Profile"
      id={identity?.profileData?.id} 
      title="Inscription professionnels" 
      transform={(data) => ({ ...data, 'vcard:fn': data['vcard:given-name'] })}
      actions={false}
      customToolbar={<ToolbarWithoutDelete />}
      onSuccess={join}
    >
      <SimpleForm initialValues={{ 'vcard:hasTelephone': { 'vcard:hasValue': 'tel:+33' } }}>
        <Typography fullWidth gutterBottom>
          Si vous souhaitez vous inscrire sur la plateforme SyRéeN au titre de votre activité professionnelle,
          nous vous proposons de remplir le formulaire qui suit afin de faire plus ample connaissance et d’officialiser 
          votre adhésion au réseau de professionnels qui souhaitent développer le réemploi de matériaux de construction
          en Normandie.
        </Typography>
        <TextInput source="vcard:given-name" validate={[required()]} fullWidth />
        <TextInput source="vcard:family-name" validate={[required()]} fullWidth />
        <QuickCreateLocationInput reference="Location" source="vcard:hasAddress" validate={[required()]} />
        <PhoneInput source="vcard:hasTelephone" phoneType={['vcard:Voice', 'vcard:Work']} validate={[required(), validPhone]} fullWidth />
        <SelectInput source="syreen:actorType" fullWidth validate={[required()]} translateChoice={false} optionValue="name" choices={actorTypes} />
        <TextInput source="syreen:activityDomain" fullWidth validate={[required()]} helperText="Exemple: Maçonnerie, carrelage, faïence" />
      </SimpleForm>
    </Edit>
  );
}

export default JoinGroupPage;
