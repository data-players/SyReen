import React from 'react';
import { Link, useGetIdentity, useNotify, useRecordContext } from 'react-admin';
import { Box, TextField, Button, makeStyles } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import SendIcon from '@material-ui/icons/Send';
import { useOutbox, useCollection, OBJECT_TYPES } from '@semapps/activitypub-components';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  alert: {
    alignItems: 'center'
  },
  signupButton: {
    marginLeft: 6,
  },
}));

const FinalFormTextField = ({ input: { name, onChange, value, ...restInput }, meta, ...rest }) => (
  <TextField
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    inputProps={restInput}
    onChange={onChange}
    value={value}
    style={{ marginTop: 0 }}
  />
);

const ContactField = ({ source, context, ...rest }) => {
  const classes = useStyles();
  const record = useRecordContext(rest);
  const notify = useNotify();
  const outbox = useOutbox();
  const { identity, loading: identityLoading } = useGetIdentity();
  const { items: contacts, loaded: contactsLoaded } = useCollection('apods:contacts');

  const onSubmit = async (values) => {
    try {
      await outbox.post({
        type: OBJECT_TYPES.NOTE,
        attributedTo: outbox.owner,
        to: record[source],
        content: values.content,
        context: context ? record[context] : undefined,
      });
      notify('Message envoyé', 'success');
    } catch (e) {
      notify('Erreur lors de l\'envoi du message', 'error', { error: e.message });
    }
  };

  return (
    <>
      {(identity?.id) && (
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting }) => (
            <form onSubmit={(event) => handleSubmit(event).then(form.reset)}>
              {identity?.id !== record['dc:creator'] && contactsLoaded && !contacts.includes(record[source]) && (
                <Box mb={1}>
                  <Alert severity="warning">
                    Envoyer un message à { record?.['vcard:given-name'] } lui donnera le droit de voir votre profil, pour lui permettre de vous répondre.
                  </Alert>
                </Box>
              )}
              <Field
                name="content"
                component={FinalFormTextField}
                label="Message"
                variant="filled"
                margin="dense"
                fullWidth
                multiline
                rows={5}
              />
              <Box mt={1}>
                <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />} disabled={submitting}>
                  Envoyer
                </Button>
              </Box>
            </form>
          )}
        />
      )}
      {(!identityLoading && !identity?.id) && (
        <Box mb={1}>
          <Alert severity="warning" className={classes.alert}>
            Pour contacter le responsable de l'annonce, il est nécessaire de créer un compte : 
            <Link to="/login?signup">
              <Button variant="contained" color="secondary" className={classes.signupButton}>
                S'INSCRIRE
              </Button>
            </Link>
          </Alert>
        </Box>
      )}
    </>
  );
};

ContactField.defaultProps = {
  addLabel: true,
};

export default ContactField;
