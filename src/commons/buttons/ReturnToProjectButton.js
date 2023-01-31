import React from 'react';
import { Button, Link, linkToRecord, useRecordContext } from "react-admin";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ReturnToProjectButton = ({ linkType }) => {
  const record = useRecordContext();
  return (
    <Button
      component={Link}
      to={linkToRecord('/projects', record?.['pair:partOf'], linkType) + '/1'}
      label="Retour"
    >
      <ArrowBackIcon />
    </Button>
  );
}

ReturnToProjectButton.defaultProps = {
  linkType: 'show'
};

export default ReturnToProjectButton;