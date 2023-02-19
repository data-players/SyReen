import React from 'react';
import { ShowBase, ReferenceManyField, Tab, TabbedShowLayout, TextField, useRecordContext } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { useCheckAuthenticated } from '@semapps/auth-provider';
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
import AddOfferButton from "../../commons/buttons/AddOfferButton";
import CardsList from "../../commons/lists/CardsList";
import OfferCard from "../Offer/OfferCard";

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
  const { identity } = useCheckAuthenticated();
  if (!identity?.id) return null;
  return (
    <ShowBase {...props}>
      <ShowPage
        title={<Title />}
        actions={<EditButton />}
        details={<ProjectDetails />}
      >
        <TabbedShowLayout>
          <Tab label="Général">
            <MainList Label={BodyLabel}>
              <TextField source="pair:alternativeLabel" />
              <MarkdownField source="pair:description" addLabel={true} />
              <LocationField source="pair:hasLocation" />
              <DateField source="pair:startDate" />
              <DateField source="pair:endDate" />
              <ReferenceField reference="Actor" source="dc:creator" link={false}>
                <ReferenceField reference="Profile" source="url" link={false}>
                  <ProfileField />
                </ReferenceField>
              </ReferenceField>
              <ContactField label="Contacter le responsable" source="dc:creator" context="id" />
            </MainList>
          </Tab>
          <Tab label="Offres">
            <AddOfferButton />
            <OffersList />
          </Tab>
        </TabbedShowLayout>
      </ShowPage>
    </ShowBase>
  );
};

export default ProjectShow;
