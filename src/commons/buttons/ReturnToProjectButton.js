import React from 'react';
import { Button, Link, linkToRecord, useRecordContext } from "react-admin";
import WorkIcon from '@material-ui/icons/Work';

const ReturnToProjectButton = ({ linkType }) => {
  const record = useRecordContext();
  return (
    <Button
      component={Link}
      to={linkToRecord('/projects', record?.['pair:partOf'], linkType) + '/1'}
      label="Voir Le projet"
    >
      <WorkIcon />
    </Button>
  );
}

ReturnToProjectButton.defaultProps = {
  linkType: 'show'
};

export default ReturnToProjectButton;