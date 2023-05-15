import React from 'react';
import { DateField, NumberField } from 'react-admin';
import IconsList from '../../commons/lists/IconsList';
import EventIcon from '@material-ui/icons/Event';
import ConceptField from '../../commons/fields/ConceptField';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  offerDetailsRoot: {
    '& > ul.MuiList-root': {
      flexWrap: 'wrap',
      '& > li': {
        width: 'unset',
      },
    }
  }
}));

const OfferDetails = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.offerDetailsRoot}>
      <IconsList {...props}>
        <DateField
          source="dc:created"
          locales={process.env.REACT_APP_LANG}
          options={{ year: 'numeric', month: 'long', day: 'numeric' }}
          icon={<EventIcon />}
        />
        <NumberField source="syreen:quantity"/>
        <ConceptField reference="Unit" source="syreen:hasUnit" />
        <ConceptField reference="Stage" source="syreen:hasStage" />
        <DateField source="syreen:startDate" showTime />
      </IconsList>
    </Box>
  );
};

export default OfferDetails;
