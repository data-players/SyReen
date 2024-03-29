import React from 'react';
import { TextField, DateField } from 'react-admin';
import Show from "../../layout/profile/Show";
import ProfileTitle from "./ProfileTitle";
import Hero from "../../commons/lists/profile/Hero/Hero";
import UsernameField from "../../commons/fields/profile/UsernameField";
import ContactField from "../../commons/fields/ContactField";
import MainList from "../../commons/lists/profile/MainList/MainList";
import BlockAnonymous from "../../commons/BlockAnonymous";

const ProfileShow = (props) => {
  return (
    <BlockAnonymous>
      <Show title={<ProfileTitle />} {...props}>
        <Hero image="vcard:photo">
          <TextField source="vcard:given-name" />
          <UsernameField source="describes" />
          <TextField source="vcard:note" />
          <DateField source="dc:created" locales={process.env.REACT_APP_LANG} options={{ month: 'long', day: 'numeric', year: 'numeric' }} />
        </Hero>
        <MainList>
          <ContactField source="describes" label='Envoyer un message' />
        </MainList>
      </Show>
    </BlockAnonymous>
  );
}

export default ProfileShow;
