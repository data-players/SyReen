import React, { useState, useCallback } from 'react';
import { SaveButton, SimpleForm, TextInput, Toolbar, useGetIdentity, required, useNotify, useRedirect } from "react-admin";
import { Typography } from '@material-ui/core';
import { useOutbox, ACTIVITY_TYPES } from '@semapps/activitypub-components';
import Edit from '../layout/profile/Edit';
import QuickCreateLocationInput from '../commons/inputs/QuickCreateLocationInput';
import useSyreenGroupMember from '../hooks/useSyreenGroupMember';
import PhoneInput from '../commons/inputs/PhoneInput';
import ActorTypeSelectInput from '../commons/inputs/ActorTypeSelectInput';
import SendIcon from '@material-ui/icons/Send';

const GROUP_URI = process.env.REACT_APP_AGGREGATOR_BASE_URL + '/actors/syreen';

const ToolbarWithoutDelete = props => (
  <Toolbar {...props} >
    <SaveButton label="Envoyer la demande" icon={<SendIcon />} />
  </Toolbar>
);

export const JoinGroupPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const { identity } = useGetIdentity();
  const redirect = useRedirect();
  const outbox = useOutbox();
  const notify = useNotify();
  const { isMember, loaded } = useSyreenGroupMember();

  const joinGroup = useCallback(
    async () => {
      try {
        await outbox.post({
          type: ACTIVITY_TYPES.JOIN,
          actor: outbox.owner,
          object: GROUP_URI,
          to: GROUP_URI,
        });
        setSubmitted(true);
      } catch (e) {
        notify(e.message, { type: 'error' });
      }
    },
    [outbox, notify, setSubmitted]
  );

  if (!identity?.id || !loaded) return null;

  // if (loaded && isMember) {
  //   notify("Vous êtes déjà membre du groupe Syreen", { type: 'error' });
  //   redirect('/');
  // }

  return (
    <Edit
      resource="Profile"
      basePath="/Profile"
      id={identity?.profileData?.id} 
      title={submitted ? "Demande envoyée !" : "Inscription professionnels"} 
      transform={(data) => ({ ...data, 'vcard:fn': data['vcard:given-name'] })}
      actions={false}
      customToolbar={<ToolbarWithoutDelete />}
      mutationMode="pessimistic"
      onSuccess={joinGroup}
    >
      
        {submitted ? (
          <Typography fullWidth gutterBottom>
            En attendant de pouvoir se rencontrer et échanger des matériaux ou tout autre chose concernant le réemploi, merci à vous
            pour votre participation au développement de la filière locale de réemploi de matériaux de construction.
            <br /><br />
            Allez, c’est parti, diffusez vos offres, évaluez-les, rencontrez vos futurs clients, déposez vos recherches et vos alertes
            pour ce que vous cherchez... 
          </Typography>
        ): (
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
            <PhoneInput source="vcard:hasTelephone" phoneType={['vcard:Voice', 'vcard:Work']} validate={[required()]} fullWidth />
            <ActorTypeSelectInput source="syreen:actorType" fullWidth validate={[required()]} />
            <TextInput source="syreen:activityDomain" fullWidth validate={[required()]} helperText="Exemple: Maçonnerie, carrelage, faïence" />
          </SimpleForm>
        )}
    </Edit>
  );
}

export default JoinGroupPage;
