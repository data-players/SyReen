import React from 'react';
import { useGetIdentity, useNotify, useRecordContext } from 'react-admin';
import { Box, TextField, Button } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import SendIcon from '@material-ui/icons/Send';
import { useOutbox, useCollection, OBJECT_TYPES } from '@semapps/activitypub-components';
import Alert from '@material-ui/lab/Alert';

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
  const record = useRecordContext(rest);
  const notify = useNotify();
  const outbox = useOutbox();
  const { identity } = useGetIdentity();
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
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting }) => (
        <form onSubmit={(event) => handleSubmit(event).then(form.reset)}>
          {identity?.id !== record['dc:creator'] && contactsLoaded && !contacts.includes(record[source]) && (
            <Box mb={1}>
              <Alert severity="warning">
                Sending a message to { record?.['vcard:given-name'] } will give him/her the right to see your profile, in order to be able to respond.
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
  );
};

ContactField.defaultProps = {
  addLabel: true,
};

export default ContactField;
