import React from 'react';
import { DateField, TextField } from 'react-admin';
import { makeStyles, Box } from '@material-ui/core';
import { ReferenceField } from '@semapps/field-components';
import EventIcon from '@material-ui/icons/Event';
import Chip from '../../commons/Chip';
import FaceIcon from '@material-ui/icons/Face';
import TextWithDefaultField from '../../commons/fields/TextWithDefaultField';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  description: {
    marginTop: 10,
    fontSize: '14px',
    '& span': {
      fontSize: '14px',
    },
    display: 'block',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '3.6em',
  },
}));

const OfferCard = ({ record }) => {
  const classes = useStyles();
  return (
    <Box pt={1} pb={1}>
      <Box mb={1}>
        <TextField variant="h2" color="primary" record={record} source="syreen:label" className={classes.title} />
      </Box>
      <Box>
        <Chip icon={<EventIcon />}>
          <DateField
            record={record}
            source="dc:created"
            locales={process.env.REACT_APP_LANG}
            options={{ year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }}
            showTime
          />
        </Chip>
        <Chip icon={<FaceIcon />}>
          <ReferenceField record={record} reference="Actor" source="dc:creator" link={false}>
            <ReferenceField reference="Profile" source="url" link={false}>
              <TextWithDefaultField source="vcard:given-name" defaultValue="Inconnu" />
            </ReferenceField>
          </ReferenceField>
        </Chip>
      </Box>
      <TextField record={record} source="syreen:description" className={classes.description} />
    </Box>
  );
};

OfferCard.defaultProps = {
  variant: 'full',
};

export default OfferCard;
