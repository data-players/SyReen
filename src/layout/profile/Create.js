import React from 'react';
import {ListButton, ResourceContextProvider, CreateContextProvider, useCreateController} from 'react-admin';
import EditPage from "../EditPage";
import ShowButton from '../../commons/buttons/ShowButton';

const Actions= ({hasList=true, hasShow=true}) => (
  <>
    {hasList && <ListButton />}
    {hasShow && <ShowButton />}
  </>
);

const Create = (props) => {
  const controllerProps = useCreateController(props);
  return(
    <ResourceContextProvider value={props.resource}>
      <CreateContextProvider value={controllerProps}>
        <EditPage {...props} {...controllerProps} actions={<Actions {...props} />} hasDelete={false} ></EditPage>
      </CreateContextProvider>
    </ResourceContextProvider>
  )
};

export default Create;
