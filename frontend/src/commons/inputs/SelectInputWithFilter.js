import React from 'react';
import { SelectInput, useGetOne, useListContext } from 'react-admin';
import { useForm, useFormState } from 'react-final-form';

const SelectInputWithFilter = (props) => {

  const { data:filterData } = useGetOne(
    props.conditionalfilter.resource,
    props.conditionalfilter.id,
  );
  let filterIds=[];
  if (filterData && filterData[props.source]) {
    filterIds = filterIds.concat(filterData[props.source]);
  }
  
  const listContext = useListContext();
  const form = useForm();
  const formState = useFormState();
  let choices = Object.values(listContext.data).filter(choice => filterIds.includes(choice.id));
  if (choices.length === 0) {
    choices = props.choices;
  }
  if (formState?.dirtyFields?.['syreen:hasCategory'] && !choices.find(choice => choice.id === formState.values['syreen:hasUnit']) ) {
    form.change('syreen:hasUnit', undefined);
  }

  return (
    <SelectInput
      optionText="syreen:label"
      {...props}
      choices={choices}
    />
  );
}

export default SelectInputWithFilter;