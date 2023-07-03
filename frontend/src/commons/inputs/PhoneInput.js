import React from 'react';
import { TextInput } from "react-admin"

const validPhone = (value) => {
  if (!value || !value['vcard:hasValue']) return undefined;
  if (!value['vcard:hasValue'].startsWith('tel:+') || isNaN(value['vcard:hasValue'].replace('tel:+',''))) {
      return 'Utiliser le format +3364 avec des chiffres et aucun espace';
  }
  return undefined;
};

const PhoneInput = ({ phoneType, validate, ...rest }) => (
  <TextInput 
    parse={value => ({
      type: phoneType,
      'vcard:hasValue': "tel:" + value
    })}
    validate={[...validate, validPhone]}
    format={value => value && value['vcard:hasValue'] && value['vcard:hasValue'].replace('tel:', '')}
    helperText="Format: +33649955187"
    {...rest}
  />
);

PhoneInput.defaultProps = {
  phoneType: ['vcard:Home', 'vcard:Voice']
}

export default PhoneInput;
