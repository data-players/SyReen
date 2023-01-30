import React from 'react';
import {
  SimpleForm,
  ImageInput,
  TextInput,
  required,
  SelectInput,
  FormDataConsumer,
  RadioButtonGroupInput, useTranslate,
} from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageField } from '@semapps/field-components';
import { ReferenceInput } from '@semapps/input-components';
import { DateTimeInput } from '@semapps/date-components';
import frLocale from 'date-fns/locale/fr';
import BodyLabel from '../../commons/lists/BodyLabel';
import { currencies } from '../../config/constants';

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
  return (
    <SimpleForm {...props} redirect="show">
      <TextInput source="pair:label" fullWidth validate={[required()]} />
      <MarkdownInput source="pair:description" fullWidth validate={[required()]} isRequired />
    </SimpleForm>
  );
};

export default Form;