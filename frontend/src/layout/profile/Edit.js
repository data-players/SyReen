import React from 'react';
import { ListButton, ResourceContextProvider, EditContextProvider, useEditController } from 'react-admin';
import EditPage from "../EditPage";
import ShowButton from '../../commons/buttons/ShowButton';

const Actions= ({hasList=true, hasShow=true}) => (
  <>
    {hasList && <ListButton />}
    {hasShow && <ShowButton />}
  </>
);

const Edit = (props) => {
  const controllerProps = useEditController(props);
  return(
    <ResourceContextProvider value={props.resource}>
      <EditContextProvider value={controllerProps}>
        <EditPage hasDelete={false} {...controllerProps} {...props} ></EditPage>
      </EditContextProvider>
    </ResourceContextProvider>
  )
};

Edit.defaultProps = {
  actions: <Actions />
}

export default Edit;
