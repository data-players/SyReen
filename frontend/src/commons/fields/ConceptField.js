import React from 'react';
import { TextField } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textField: {
    fontSize: 16,
  },
}));

const ConceptField = (props) => {
  const classes = useStyles();
  return (
    <ReferenceField link={false} {...props}>
      <TextField source="syreen:label" className={classes.textField}/>
    </ReferenceField>
  );
};

export default ConceptField;
