import React from 'react';
import { DateField as RaDateField, useRecordContext } from 'react-admin';


const DateField = ({ source }) => {
  const record = useRecordContext();
  return (
    <RaDateField
      record={record}
      source={source}
      locales={process.env.REACT_APP_LANG}
      options={{ year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }}
      showTime
    />
  );
};

DateField.defaultProps = {
  addLabel: true,
};

export default DateField;
