import React from 'react';
import { TextField, useRecordContext } from 'react-admin';

const TextWithDefaultField = ({ defaultValue, ...rest }) => {
  const record = useRecordContext();
  return record && !record['_error'] ? <TextField {...rest} /> : <span>{defaultValue}</span>
}

export default TextWithDefaultField;
