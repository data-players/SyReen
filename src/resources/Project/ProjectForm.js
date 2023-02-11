import React from 'react';
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
import { ReferenceInput } from '@semapps/input-components';
import { DateTimeInput } from '@semapps/date-components';
import frLocale from 'date-fns/locale/fr';
import AddOfferButton from "../../commons/buttons/AddOfferButton";
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
    return 'app.validation.futureDate';
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
  return (
    <TabbedForm {...props} redirect="show" className={classes.root}>
      <FormTab label="Général">
        <TextInput source="pair:label" fullWidth validate={[required()]} />
        <SelectInput source="syreen:type" choices={concepts.projectTypes} fullWidth validate={[required()]} isRequired />
        <SelectInput source="syreen:status" choices={concepts.projectStatus} fullWidth validate={[required()]} isRequired />
        <MarkdownInput source="pair:description" fullWidth validate={[required()]} isRequired />
        <ImageInput source="pair:depictedBy" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
        <ReferenceInput reference="Location" source="pair:hasLocation" fullWidth>
          <SelectInput optionText="vcard:given-name" />
        </ReferenceInput>
        <MarkdownInput source="syreen:locationInformation" fullWidth />
        <DateTimeInput source="pair:startDate" validate={[futureDate]} {...dateTimeInputProps} />
        <DateTimeInput source="pair:endDate" validate={[futureDate]} {...dateTimeInputProps} />
      </FormTab>
      {isEditMode &&
        <FormTab label="Offres">
          <AddOfferButton />
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
