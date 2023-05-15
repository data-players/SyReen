import React from 'react';
import {
  FormDataConsumer,
  FormTab,
  TabbedForm,
  BooleanInput,
  NumberInput,
  TextInput,
  required
} from 'react-admin';
import { Box, makeStyles } from '@material-ui/core';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import { MarkdownInput } from '@semapps/markdown-components';
import { DateTimeInput } from '@semapps/date-components';
import CameraInput from '../../commons/inputs/CameraInput';
import LocationInput from "../../commons/inputs/LocationInput";
import ConceptInput from "../../commons/inputs/ConceptInput";
import { futureDate, dateTimeInputProps } from "../../commons/inputs/dateTimeInputUtils";

const useStyles = makeStyles((theme) => ({
  tab: {
    flexShrink: 'unset',
    '& span': {
      lineHeight: '125%'
    }
  },
  calculatedValue: {
    textAlign: 'center',
    fontSize: '150%',
    margin: '32px 0',
  },
  publication: {
    alignItems: 'center'
  },
  hiddenInput: {
    display: 'none'
  }
}));


const OfferForm = (props) => {
  const classes = useStyles();
  const { identity } = useCheckAuthenticated();
  if (!identity?.id) return null;
  return (
    <TabbedForm {...props} redirect="show">
      <FormTab label="Général" className={classes.tab}>
        <TextInput source="syreen:label" fullWidth validate={[required()]} />
        <TextInput source="syreen:alternativeLabel" fullWidth />
        <MarkdownInput source="syreen:description" fullWidth />
        <CameraInput source="syreen:depictedBy" />
        <ConceptInput
          reference="Category"
          source="syreen:hasCategory"
          validate={[required()]} isRequired
          fullWidth
          autocomplete={true}
          sort={{field:"syreen:label", order:"ASC"}}
        />
        <NumberInput source="syreen:quantity" fullWidth validate={[required()]} isRequired />
        <FormDataConsumer>
          {({ formData, ...rest }) => 
            <ConceptInput
              reference="Unit"
              source="syreen:hasUnit"
              validate={[required()]} isRequired
              fullWidth
              conditionalfilter={{resource: 'Category', id:formData['syreen:hasCategory']}}
            />
          }
        </FormDataConsumer>
        <ConceptInput reference="Stage" source="syreen:hasStage" validate={[required()]} isRequired fullWidth />
        <DateTimeInput source="syreen:startDate" validate={[futureDate]} {...dateTimeInputProps} />
        <NumberInput source="syreen:sellingPrice" fullWidth />
        <LocationInput reference="Location" source="syreen:hasLocation" fullWidth />
        <MarkdownInput source="syreen:locationInformation" fullWidth />
      </FormTab>
      <FormTab label="Valeur sur le marché" className={classes.tab}>
        <NumberInput source="syreen:estimatedNewValue" fullWidth />
        <NumberInput source="syreen:agePercentage" fullWidth />
        <NumberInput source="syreen:interestPercentage" fullWidth />
        <NumberInput source="syreen:performancePercentage" fullWidth />
        <FormDataConsumer>
            {({ formData, ...rest }) => {
              delete rest.record["syreen:marketValue"];
              let marketValue = 0;
              if (formData['syreen:estimatedNewValue']) {
                const agePercentage = formData['syreen:agePercentage'] ? formData['syreen:agePercentage'] : 100;
                const interestPercentage = formData['syreen:interestPercentage'] ? formData['syreen:interestPercentage'] : 100;
                const performancePercentage = formData['syreen:performancePercentage'] ? formData['syreen:performancePercentage'] : 100;
                marketValue = formData['syreen:estimatedNewValue'] * agePercentage/100 * interestPercentage/100 * performancePercentage/100;
              }
              rest.record["syreen:marketValue"] = marketValue;
              return (
                <Box>
                  <Box className={classes.calculatedValue}>{marketValue} €</Box>
                  <NumberInput source="syreen:marketValue" className={classes.hiddenInput} defaultValue={marketValue} />
                </Box>
              );
            }}
        </FormDataConsumer>
        <BooleanInput source="syreen:publishMarketValue" className={classes.publication} fullWidth />
      </FormTab>
      <FormTab label="Coût de revient" className={classes.tab}>
        <NumberInput source="syreen:hourlyPrice" fullWidth />
        <NumberInput source="syreen:dismantlingHours" fullWidth />
        <NumberInput source="syreen:collectionHours" fullWidth />
        <NumberInput source="syreen:refurbishmentAndSaleHours" fullWidth />
        <NumberInput source="syreen:additionalCosts" fullWidth />
        <FormDataConsumer>
            {({ formData, ...rest }) => {
              delete rest.record["syreen:costPrice"];
              let costPrice = 0;
              if (formData['syreen:hourlyPrice']) {
                const dismantlingHours = formData['syreen:dismantlingHours'] ? formData['syreen:dismantlingHours'] : 0;
                const collectionHours = formData['syreen:collectionHours'] ? formData['syreen:collectionHours'] : 0;
                const refurbishmentAndSaleHours = formData['syreen:refurbishmentAndSaleHours'] ? formData['syreen:refurbishmentAndSaleHours'] : 0;
                const additionalCosts = formData['syreen:additionalCosts'] ? formData['syreen:additionalCosts'] : 0;
                costPrice = formData['syreen:hourlyPrice'] * (dismantlingHours + collectionHours + refurbishmentAndSaleHours) + additionalCosts;
              }
              rest.record["syreen:costPrice"] = costPrice;
              return (
                <Box>
                  <Box className={classes.calculatedValue}>{costPrice} €</Box>
                  <NumberInput source="syreen:costPrice" className={classes.hiddenInput} defaultValue={costPrice} />
                </Box>
              );
            }}
        </FormDataConsumer>
        <BooleanInput source="syreen:publishCostPrice" className={classes.publication} fullWidth />
      </FormTab>
    </TabbedForm>
  );
};

export default OfferForm;
