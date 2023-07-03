import React from 'react';
import { TextInput } from "react-admin"

const PhoneInput = ({ phoneType, ...rest }) => (
  <TextInput 
    parse={value => ({
      type: phoneType,
      'vcard:hasValue': "tel:" + value
    })}
    format={value => {
      console.log('value', value);
      return value && value['vcard:hasValue'] && value['vcard:hasValue'].replace('tel:', '')
    }}
    helperText="Format: +33649955187"
    {...rest}
  />
);

PhoneInput.defaultProps = {
  phoneType: ['vcard:Home', 'vcard:Voice']
}

export default PhoneInput;
