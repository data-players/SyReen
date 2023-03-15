import React, { useState } from 'react';
import { useForm } from 'react-final-form';
import {
  required,
  Button,
  SaveButton,
  TextInput,
  useCreate,
  useNotify,
  FormWithRedirect
} from 'react-admin';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconCancel from '@material-ui/icons/Cancel';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { makeStyles } from '@material-ui/core';

import { extractContext, LocationInput } from '@semapps/geo-components';

const useStyles = makeStyles(theme => ({
  button: {
    marginBottom: theme.spacing(2),
    color: '#FFF',
  },
}));

function AddLocationButton({ onChange }) {
  // https://codesandbox.io/s/react-admin-v3-advanced-recipes-quick-createpreview-voyci

  const classes = useStyles();
  
  const [showDialog, setShowDialog] = useState(false);
  const [create, { loading }] = useCreate('Location');
  const notify = useNotify();
  const form = useForm();

  const handleClick = () => {
      setShowDialog(true);
  };

  const handleCloseClick = () => {
      setShowDialog(false);
  };

  const handleSubmit = async values => {
    // needed to filter current form values
    const filteredValues = {
      'vcard:given-name': values['vcard:given-name'],
      'vcard:hasAddress': values['vcard:hasAddress'],
      'vcard:note': values['vcard:note'],
    }
    create(
      { payload: { data: filteredValues } },
      {
        onSuccess: ({ data }) => {
          setShowDialog(false);
          // Update the inital form to target the newly created location
          // Updating the ReferenceInput value will force it to reload the available locations
          form.change('pair:hasLocation', data.id);
          onChange();
        },
        onFailure: ({ error }) => {
          notify(error.message, 'error');
        }
      }
    );
  };

  return (
    <>
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleClick}
        label="Ajouter une adresse"
        color="primary"
      >
        <ChatBubbleIcon />
      </Button>
        <Dialog
          fullWidth
          open={showDialog}
          onClose={handleCloseClick}
          aria-label="Ajouter une adresse"
        >
          <DialogTitle>Ajouter une adresse</DialogTitle>

          <FormWithRedirect
            resource="Location"
            save={handleSubmit}
            render={({
              handleSubmitWithRedirect,
              pristine,
              saving
            }) => (
              <>
                <DialogContent>
                  <TextInput source="vcard:given-name" fullWidth label='Nom du lieu' />
                  <LocationInput
                    mapboxConfig={{
                      access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
                      types: ['place', 'address'],
                      country: ['fr', 'be', 'ch'],
                    }}
                    source="vcard:hasAddress"
                    parse={(value) => ({
                      type: 'vcard:Address',
                      'vcard:given-name': value.place_name,
                      'vcard:locality': value.place_type[0] === 'place' ? value.text : extractContext(value.context, 'place'),
                      'vcard:street-address': value.place_type[0] === 'address' ? [value.address, value.text].join(' ') : undefined,
                      'vcard:postal-code': extractContext(value.context, 'postcode'),
                      'vcard:country-name': extractContext(value.context, 'country'),
                      'vcard:hasGeo': {
                        'vcard:longitude': value.center[0],
                        'vcard:latitude': value.center[1],
                      },
                    })}
                    optionText={(resource) => resource['vcard:given-name']}
                    validate={[required()]}
                    fullWidth
                    label='Adresse'
                  />
                  <TextInput
                    source="vcard:note"
                    fullWidth
                    helperText='Indications supplémentaires pour aider à trouver ce lieu'
                    label='Indications'
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    label="ra.action.cancel"
                    onClick={handleCloseClick}
                    disabled={loading}
                  >
                    <IconCancel />
                  </Button>
                  <SaveButton
                    handleSubmitWithRedirect={handleSubmitWithRedirect}
                    pristine={pristine}
                    saving={saving}
                    disabled={loading}
                  />
                </DialogActions>
              </>
            )}
          />
        </Dialog>
    </>
  );
}

export default AddLocationButton;
