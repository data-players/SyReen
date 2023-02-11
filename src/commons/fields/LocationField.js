import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { MapField } from '@semapps/geo-components';
import { ReferenceField } from '@semapps/field-components'
import MarkdownField from '../../commons/fields/MarkdownField';
import { useRecordContext } from 'react-admin';

const useStyles = makeStyles((theme) => ({
  markdownFieldContainer: {
    '& strong': {
      float: 'left'
    },
    '& p': {
      display: 'inline',
      fontSize: 14
    }
  },
}));

const LocationField = ({ label, source, ...rest }) => {
  const classes = useStyles();
  const recordContext = useRecordContext(rest);
  return (
    <>
      <ReferenceField reference="Location" record={recordContext} source={source} link={false}>
        <MapField
          address={(locationRecord) => (
            <>
              {locationRecord?.['vcard:given-name'] + ', ' + locationRecord?.['vcard:hasAddress']?.['vcard:given-name']}
              {locationRecord?.['vcard:note'] && (
                <Box mb={2} mt={2}>
                  <Alert severity="info">
                    <strong>Note</strong>:&nbsp;{locationRecord?.['vcard:note']}
                  </Alert>
                </Box>
              )}
              {recordContext?.['syreen:locationInformation'] && (
                <Box mb={2} mt={2} className={classes.markdownFieldContainer}>
                  <Alert severity="info">
                    <strong>Note</strong>:&nbsp; 
                    <MarkdownField
                      record={recordContext}
                      source="syreen:locationInformation"
                      addLabel={false}/>
                  </Alert>
                </Box>
              )}
            </>
          )}
          latitude={(record) => record?.['vcard:hasAddress']?.['vcard:hasGeo']?.['vcard:latitude']}
          longitude={(record) => record?.['vcard:hasAddress']?.['vcard:hasGeo']?.['vcard:longitude']}
          height={250}
        />
      </ReferenceField>
    </>
  );
};

LocationField.defaultProps = {
  addLabel: true,
};

export default LocationField;
