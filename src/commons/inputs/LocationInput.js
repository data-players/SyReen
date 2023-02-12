import React, { useState, useCallback } from 'react';
import { SelectInput } from 'react-admin';
import { ReferenceInput } from '@semapps/input-components';
import AddLocationButton from "../buttons/AddLocationButton";

const LocationInput = ({reference, source, onChange, ...props}) => {
  
  // Needed to trigger orm change and enable save button :
  // https://codesandbox.io/s/react-admin-v3-advanced-recipes-quick-createpreview-voyci
  const [version, setVersion] = useState(0);
  const handleChange = useCallback(() => { 
    setVersion(version + 1);
    onChange();
  }, [onChange, version]);

  return (
    <div>
      <ReferenceInput key={version} reference={reference} source={source} {...props}>
        <SelectInput optionText="vcard:given-name" />
      </ReferenceInput>
      <AddLocationButton onChange={handleChange} />
    </div>
  );
};

export default LocationInput;
