import React from 'react';
import { ShowBase, ReferenceManyField, Tab, TabbedShowLayout, TextField, useRecordContext, useGetIdentity } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import MarkdownField from '../../commons/fields/MarkdownField';
import ContactField from '../../commons/fields/ContactField';
import ShowPage from '../../layout/ShowPage';
import BodyLabel from '../../commons/lists/BodyLabel';
import EditButton from '../../commons/buttons/EditButton';
import DateField from '../../commons/fields/DateField';
import ProfileField from '../../commons/fields/ProfileField';
import LocationField from '../../commons/fields/LocationField';
import MainList from '../../commons/lists/MainList';
import ProjectDetails from './ProjectDetails';
import Title from '../Title';
import CardsList from "../../commons/lists/CardsList";
import OfferCard from "../Offer/OfferCard";
import AddOfferButton from "../../commons/buttons/AddOfferButton";

const OffersList = () => {
  const recordContext = useRecordContext();
  return (
    <>
      { recordContext &&
        <ReferenceManyField
          addLabel={false}
          reference="offers"
          target="pair:partOf"
        >
          <CardsList CardComponent={OfferCard} link="show" />
        </ReferenceManyField>
      }
    </>
  );
}

const ProjectShow = (props) => {
  const { identity } = useGetIdentity();
  return (
    <ShowBase {...props}>
      <ShowPage
        title={<Title />}
        actions={
          identity?.id
            ? [<AddOfferButton key="addOffer" title="Ajouter une offre" />, <EditButton key="edit" />]
            : null
        }
        details={<ProjectDetails />}
      >
        <TabbedShowLayout>
          <Tab label="Général">
            <MainList Label={BodyLabel}>
              <TextField source="syreen:alternativeLabel" />
              <MarkdownField source="syreen:description" addLabel={true} />
              <LocationField source="syreen:hasLocation" />
              <DateField source="syreen:startDate" />
              <DateField source="syreen:endDate" />
              <ReferenceField reference="Actor" source="dc:creator" link={false}>
                <ReferenceField reference="Profile" source="url" link={false}>
                  <ProfileField />
                </ReferenceField>
              </ReferenceField>
              <ContactField label="Contacter le responsable" source="dc:creator" context="id" />
            </MainList>
          </Tab>
          <Tab label="Offres">
            <OffersList />
          </Tab>
        </TabbedShowLayout>
      </ShowPage>
    </ShowBase>
  );
};

export default ProjectShow;
