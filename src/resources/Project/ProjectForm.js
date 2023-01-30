import React from 'react';
import {
  ImageInput,
  TextInput,
  required,
  SelectInput,
  FormDataConsumer,
  RadioButtonGroupInput,
  ReferenceManyField,
  TabbedForm,
  FormTab,
  useTranslate,
} from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageField } from '@semapps/field-components';
import { ReferenceInput } from '@semapps/input-components';
import { DateTimeInput } from '@semapps/date-components';
import frLocale from 'date-fns/locale/fr';
import BodyLabel from '../../commons/lists/BodyLabel';
import { currencies } from '../../config/constants';
import AddOfferButton from "../../commons/buttons/AddOfferButton";
import CardsList from "../../commons/lists/CardsList";
import OfferCard from "../Offer/OfferCard";

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

const TypeCondition = ({ type, children, className, ...rest }) => (
  <FormDataConsumer subscription={{ values: true }}>
    {({ formData, ...rest2 }) =>
      (Array.isArray(type)
        ? type.includes(formData.type) || type.includes(formData['@type'])
        : formData.type === type || formData['@type'] === type) &&
      React.Children.map(children, (child) => React.cloneElement(child, rest))
    }
  </FormDataConsumer>
);

const Form = (props) => {
  const translate = useTranslate();
  const isEditMode = !!props.record.id;
  console.log(props);
  return (
    <TabbedForm {...props} redirect="show">
      <FormTab label="Général">
        <TextInput source="pair:label" fullWidth validate={[required()]} />
        <SelectInput source="syreen:type" fullWidth validate={[required()]} isRequired choices={[
            { id: 'type1', name: 'Chantier' },
            { id: 'type2', name: 'Déstockage' },
            { id: 'type3', name: 'Vide maison' },
        ]} />
        <SelectInput source="syreen:status" fullWidth validate={[required()]} isRequired choices={[
            { id: 'status1', name: 'Diagnostic' },
            { id: 'status2', name: 'Démontage' },
            { id: 'status3', name: 'Collecte' },
            { id: 'status3', name: 'Stockage' },
            { id: 'status3', name: 'Distribution' },
        ]} defaultValue='status1' />
        <MarkdownInput source="pair:description" fullWidth validate={[required()]} isRequired />
        <ImageInput source="pair:depictedBy" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
        <ReferenceInput reference="Location" source="mp:hasGeoCondition.pair:hasLocation" fullWidth>
          <SelectInput optionText="vcard:given-name" />
        </ReferenceInput>
        {/*
        <TypeCondition type="mp:SaleOffer">
          <BodyLabel>{translate('app.conditions.sale')}</BodyLabel>
          <TextInput source="mp:hasReciprocityCondition.mp:amount" fullWidth />
          <RadioButtonGroupInput
            source="mp:hasReciprocityCondition.mp:currency"
            choices={Object.entries(currencies).map(([k, v]) => ({ id: k, name: v }))}
          />
        </TypeCondition>
        <TypeCondition type="mp:PurchaseRequest">
          <BodyLabel>{translate('app.conditions.purchase')}</BodyLabel>
          <TextInput source="mp:hasReciprocityCondition.mp:maxAmount" fullWidth />
          <RadioButtonGroupInput
            source="mp:hasReciprocityCondition.mp:currency"
            choices={Object.entries(currencies).map(([k, v]) => ({ id: k, name: v }))}
          />
        </TypeCondition>
        <TypeCondition type="mp:BarterOffer">
          <BodyLabel>{translate('app.conditions.barter')}</BodyLabel>
          <TextInput source="mp:hasReciprocityCondition.mp:inExchangeOf" fullWidth />
        </TypeCondition>
        <TypeCondition type="mp:LoanOffer">
          <BodyLabel>{translate('app.conditions.loan')}</BodyLabel>
          <TextInput source="mp:hasTimeCondition.mp:maxDuration" fullWidth />
        </TypeCondition>
        <TypeCondition type="mp:LoanRequest">
          <BodyLabel>{translate('app.conditions.borrowing')}</BodyLabel>
          <TextInput source="mp:hasTimeCondition.mp:minDuration" fullWidth />
        </TypeCondition>
        <BodyLabel>{translate('app.conditions.other')}</BodyLabel>
        */}
        <DateTimeInput source="mp:hasTimeCondition.mp:expirationDate" validate={[futureDate]} {...dateTimeInputProps} />
      </FormTab>
      <FormTab label="Offres">
        <AddOfferButton />
        {isEditMode &&
          <ReferenceManyField
            addLabel={false}
            reference="offers"
            target="pair:partOf"
          >
            <CardsList CardComponent={OfferCard} link="edit" />
          </ReferenceManyField>
        }
      </FormTab>
    </TabbedForm>
  );
};

export default Form;
