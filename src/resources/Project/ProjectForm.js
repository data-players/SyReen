import React, { useState, useCallback } from 'react';
import {
  ImageInput,
  TextInput,
  required,
  SelectInput,
  ReferenceManyField,
  TabbedForm,
  FormTab
} from 'react-admin';
import { makeStyles } from '@material-ui/core';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageField } from '@semapps/field-components';
import { DateTimeInput } from '@semapps/date-components';
import frLocale from 'date-fns/locale/fr';
import LocationInput from "../../commons/inputs/LocationInput";
import CardsList from "../../commons/lists/CardsList";
import OfferCard from "../Offer/OfferCard";
import { concepts } from "./concepts";

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

const futureDate = (value) => {
  if (value && value <= new Date()) {
    return 'Doit être dans le futur';
  }
};

const dateTimeInputProps = {
  options: {
    format: 'dd/MM/yyyy à HH:mm',
    ampm: false,
    clearable: true,
  },
  providerOptions: {
    locale: frLocale,
  },
  fullWidth: true,
  allowClear: true,
};

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
        <TextInput source="pair:label" fullWidth validate={[required()]} />
        <TextInput source="pair:alternativeLabel" fullWidth />
        <SelectInput source="syreen:type" choices={concepts.projectTypes} fullWidth validate={[required()]} isRequired />
        <MarkdownInput source="pair:description" fullWidth validate={[required()]} isRequired />
        <ImageInput source="pair:depictedBy" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
        <LocationInput reference="Location" source="pair:hasLocation" fullWidth onChange={handleLocationChange} key={locationVersion} />
        <MarkdownInput source="syreen:locationInformation" fullWidth />
        <DateTimeInput source="pair:startDate" validate={[futureDate]} {...dateTimeInputProps} />
        <DateTimeInput source="pair:endDate" validate={[futureDate]} {...dateTimeInputProps} />
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
