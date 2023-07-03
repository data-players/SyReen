import React from 'react';
import { ImageInput, SaveButton, SimpleForm, TextInput, Toolbar, required } from "react-admin";
import { ImageField } from "@semapps/field-components";
import Edit from '../../layout/profile/Edit';
import ProfileTitle from "./ProfileTitle";
import BlockAnonymous from "../../commons/BlockAnonymous";
import ActorTypeSelectInput from '../../commons/inputs/ActorTypeSelectInput';
import PhoneInput from '../../commons/inputs/PhoneInput';
import QuickCreateLocationInput from '../../commons/inputs/QuickCreateLocationInput';
import useSyreenGroupMember from '../../hooks/useSyreenGroupMember';

const ToolbarWithoutDelete = props => (
  <Toolbar {...props} >
    <SaveButton />
  </Toolbar>
);

export const ProfileEdit = (props) => {
  const { isMember } = useSyreenGroupMember();
  return (
    <BlockAnonymous>
      <Edit title={<ProfileTitle />} transform={(data) => ({ ...data, 'vcard:fn': data['vcard:given-name'] })} {...props}>
        <SimpleForm {...props} toolbar={<ToolbarWithoutDelete />}>
          <TextInput source="vcard:given-name" validate={[required()]} fullWidth />
          <TextInput source="vcard:family-name" validate={isMember && required()} fullWidth />
          <TextInput source="vcard:note" fullWidth />
          <QuickCreateLocationInput reference="Location" source="vcard:hasAddress" validate={isMember && required()} />
          {isMember && <PhoneInput source="vcard:hasTelephone" phoneType={['vcard:Voice', 'vcard:Work']} validate={[required()]} fullWidth />}
          {isMember && <ActorTypeSelectInput source="syreen:actorType" fullWidth validate={[required()]} />}
          {isMember && <TextInput source="syreen:activityDomain" fullWidth validate={[required()]} helperText="Exemple: Maçonnerie, carrelage, faïence" />}
          <ImageInput source="vcard:photo" accept="image/*">
            <ImageField source="src" />
          </ImageInput>
        </SimpleForm>
      </Edit>
    </BlockAnonymous>
  );
}

export default ProfileEdit;
