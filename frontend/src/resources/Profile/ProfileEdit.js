import React from 'react';
import { ImageInput, SaveButton, SimpleForm, TextInput, Toolbar } from "react-admin";
import { ImageField } from "@semapps/field-components";
import Edit from '../../layout/profile/Edit';
import ProfileTitle from "./ProfileTitle";
import BlockAnonymous from "../../commons/BlockAnonymous";

const ToolbarWithoutDelete = props => (
  <Toolbar {...props} >
    <SaveButton />
  </Toolbar>
);

export const ProfileEdit = (props) => {
  return (
    <BlockAnonymous>
      <Edit title={<ProfileTitle />} transform={(data) => ({ ...data, 'vcard:fn': data['vcard:given-name'] })} {...props}>
        <SimpleForm {...props} toolbar={<ToolbarWithoutDelete />}>
          <TextInput source="vcard:given-name" fullWidth />
          <TextInput source="vcard:note" fullWidth />
          <ImageInput source="vcard:photo" accept="image/*">
            <ImageField source="src" />
          </ImageInput>
        </SimpleForm>
      </Edit>
    </BlockAnonymous>
  );
}

export default ProfileEdit;
