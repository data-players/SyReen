import React from 'react';
import { ShowBase } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import MarkdownField from '../../commons/fields/MarkdownField';
import ContactField from '../../commons/fields/ContactField';
import ShowPage from '../../layout/ShowPage';
import BodyLabel from '../../commons/lists/BodyLabel';
import ShareButton from '../../commons/buttons/ShareButton';
import EditButton from '../../commons/buttons/EditButton';
import LocationField from '../../commons/fields/LocationField';
import MainList from '../../commons/lists/MainList';
import OfferDetails from './OfferDetails';
import Title from '../Title';
import ReturnToProjectButton from "../../commons/buttons/ReturnToProjectButton";

const OfferShow = (props) => {
  const { identity } = useCheckAuthenticated();
  if (!identity?.id) return null;
  return (
    <ShowBase {...props}>
      <ShowPage
        title={<Title />}
        actions={[
          <ReturnToProjectButton key="returnToProject"/>,
          <ShareButton key="share" />,
          <EditButton key="edit" />,
        ]}
        details={<OfferDetails />}
      >
        <MainList Label={BodyLabel}>
          <MarkdownField source="syreen:description" addLabel={false} />
          <LocationField source="syreen:hasLocation" />
          <ContactField label="Contacter le responsable" source="dc:creator" context="id" />
        </MainList>
      </ShowPage>
    </ShowBase>
  );
};

export default OfferShow;
