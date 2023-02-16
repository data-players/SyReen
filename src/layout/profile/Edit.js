import React from 'react';
import { ResourceContextProvider, EditContextProvider, useEditController } from 'react-admin';
import EditPage from "../EditPage";
import ShowButton from '../../commons/buttons/ShowButton';

const Edit = (props) => {
  const controllerProps = useEditController(props);
  return(
    <ResourceContextProvider value={props.resource}>
      <EditContextProvider value={controllerProps}>
        <EditPage {...props} {...controllerProps} actions={<ShowButton />} hasDelete={false} ></EditPage>
      </EditContextProvider>
    </ResourceContextProvider>
  )
};

export default Edit;
