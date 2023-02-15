import React from 'react';
import { SimpleForm, TextInput, Toolbar, SaveButton } from 'react-admin';
import { Box, Card, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useLocation } from 'react-router-dom';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import useRequestContact from '../../hooks/useRequestContact';
import SendIcon from '@material-ui/icons/Send';

const AddContactToolbar = props => {
  return (
    <Toolbar {...props} >
      <SaveButton
        icon={<SendIcon />}
        label='Envoyer la demande'
        variant="contained"
        color="secondary"
      />
    </Toolbar>
  );
}

const ProfileCreate = () => {
  useCheckAuthenticated();
  const requestContact = useRequestContact();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <>
      <Typography variant="h2" component="h1">Demander une mise en relation</Typography>
      <Box mt={1}>
        <Card>
          <SimpleForm initialValues={{ id: searchParams.get('id') }} save={requestContact} toolbar={<AddContactToolbar />}>
            <Alert severity="info" fullWidth>Demander une mise en relation</Alert>
            <br />
            <TextInput source="id" label='Identifiant utilisateur' fullWidth />
            <TextInput source="content" label='Quelques mots sur vous' fullWidth />
          </SimpleForm>
        </Card>
      </Box>
    </>
  );
};

export default ProfileCreate;
