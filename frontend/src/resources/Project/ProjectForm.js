import React, { useState, useCallback } from 'react';
import {
  ImageInput,
  TextInput,
  required,
  ReferenceManyField,
  TabbedForm,
  FormTab
} from 'react-admin';
import { makeStyles } from '@material-ui/core';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageField } from '@semapps/field-components';
import { DateTimeInput } from '@semapps/date-components';
import LocationInput from "../../commons/inputs/LocationInput";
import CardsList from "../../commons/lists/CardsList";
import OfferCard from "../Offer/OfferCard";
import ConceptInput from "../../commons/inputs/ConceptInput";
import { futureDate, dateTimeInputProps } from "../../commons/inputs/dateTimeInputUtils";

const useStyles = makeStyles((theme) => ({
  root: isEditMode => ({
    '& .MuiTabs-root': {
      display: isEditMode ? 'revert' : 'none'
    },
    '& > .MuiDivider-root': {
      display: 'none'
    }
  }),
}));

const ProjectForm = (props) => {
  const isEditMode = !!props.record.id;
  const classes = useStyles(isEditMode);
  
  // Needed to trigger orm change and enable save button :
  // https://codesandbox.io/s/react-admin-v3-advanced-recipes-quick-createpreview-voyci
  const [locationVersion, setLocationVersion] = useState(0);
  const handleLocationChange = useCallback(() => { 
    setLocationVersion(locationVersion + 1);
  }, [locationVersion]);
  
  return (
    <TabbedForm {...props} redirect="show" className={classes.root}>
      <FormTab label="Général">
        <TextInput source="syreen:label" fullWidth validate={[required()]} />
        <TextInput source="syreen:alternativeLabel" fullWidth />
        <ConceptInput reference="ProjectType" source="syreen:hasProjectType" validate={[required()]} isRequired fullWidth />
        <MarkdownInput source="syreen:description" fullWidth validate={[required()]} isRequired />
        <ImageInput source="syreen:depictedBy" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
        <LocationInput reference="Location" source="syreen:hasLocation" fullWidth onChange={handleLocationChange} key={locationVersion} />
        <MarkdownInput source="syreen:locationInformation" fullWidth />
        <DateTimeInput source="syreen:startDate" validate={[futureDate]} {...dateTimeInputProps} />
        <DateTimeInput source="syreen:endDate" validate={[futureDate]} {...dateTimeInputProps} />
      </FormTab>
      {isEditMode &&
        <FormTab label="Offres">
          <ReferenceManyField
            addLabel={false}
            reference="offers"
            target="pair:partOf"
          >
            <CardsList CardComponent={OfferCard} link="edit" />
          </ReferenceManyField>
        </FormTab>
      }
    </TabbedForm>
  );
};

export default ProjectForm;
