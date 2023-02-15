import React from 'react';
import { ImageInput, SaveButton, SimpleForm, TextInput, Toolbar } from "react-admin";
import { ImageField } from "@semapps/field-components";
import Edit from '../../layout/profile/Edit';
import ProfileTitle from "./ProfileTitle";
import { g1PublicKeyToUrl, g1UrlToPublicKey } from "../../utils";
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
          <TextInput
            source="foaf:tipjar"
            parse={v => g1PublicKeyToUrl(v)}
            format={v => g1UrlToPublicKey(v)}
            helperText="The public key of your Ğ1 account. This will allow other members to easily send you money."
            fullWidth
          />
        </SimpleForm>
      </Edit>
    </BlockAnonymous>
  );
}

export default ProfileEdit;
