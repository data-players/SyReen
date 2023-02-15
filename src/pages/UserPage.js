import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useGetIdentity, useNotify } from 'react-admin';

const UserPage = () => {
  const params = useParams();
  const { identity, loaded: userLoaded } = useGetIdentity();
  const notify = useNotify();

  if (!userLoaded) return null;

  const contactFormUrl = '/Profile/create/?id=' + params.id;

  if (identity?.id) {
    return <Redirect to={contactFormUrl} />;
  } else {
    notify('Veuillez vous créer un compte pour vous connecter avec ' + params.id);
    return <Redirect to={'/login?signup=true&redirect=' + encodeURIComponent(contactFormUrl)} />;
  }
};

export default UserPage;
