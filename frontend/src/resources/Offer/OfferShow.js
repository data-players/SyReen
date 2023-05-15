import React from 'react';
import { ShowBase, ShowController, NumberField, TextField } from 'react-admin';
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
import ConceptField from '../../commons/fields/ConceptField';

const OfferShow = (props) => {
  const { identity } = useCheckAuthenticated();
  if (!identity?.id) return null;
  return (
    <ShowController {...props}>
      {controllerProps => 
        <ShowBase {...props} {...controllerProps}>
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
              <TextField source="syreen:alternativeLabel" />
              <MarkdownField source="syreen:description" addLabel />
              <ConceptField reference="Category" source="syreen:hasCategory" addLabel />
              <NumberField source="syreen:sellingPrice" options={{ style: 'currency', currency: 'EUR' }} />
              {controllerProps?.record?.['syreen:publishMarketValue'] &&
                <NumberField source="syreen:marketValue" options={{ style: 'currency', currency: 'EUR' }} />
              }
              {controllerProps?.record?.['syreen:publishCostPrice'] &&
                <NumberField source="syreen:costPrice" options={{ style: 'currency', currency: 'EUR' }} />
              }
              <LocationField source="syreen:hasLocation" />
              <ContactField label="Contacter le responsable" source="dc:creator" context="id" />
            </MainList>
          </ShowPage>
        </ShowBase>
      }
    </ShowController>
  );
};

export default OfferShow;
