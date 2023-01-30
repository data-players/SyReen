import React from 'react';
import {CreateBase, useTranslate} from 'react-admin';
import ProjectForm from './ProjectForm';
import CreatePage from '../../layout/CreatePage';

const addConditionClasses = (data) => {
  if (data['mp:hasGeoCondition']) {
    data['mp:hasGeoCondition'].type = 'mp:GeoCondition';
  }
  if (data['mp:hasTimeCondition']) {
    data['mp:hasTimeCondition'].type = 'mp:TimeCondition';
  }
  if (data['mp:hasReciprocityCondition']) {
    data['mp:hasReciprocityCondition'].type = 'mp:ReciprocityCondition';
  }
  return data;
};

const Create = (props) => {
  const translate = useTranslate();
  return (
    <CreateBase {...props} transform={addConditionClasses}>
      <CreatePage title={translate("app.action.create_project")}>
        <ProjectForm component="div" />
      </CreatePage>
    </CreateBase>
  );
}

export default Create;
