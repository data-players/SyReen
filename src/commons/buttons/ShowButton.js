import React from 'react';
import { useEditContext, Link, linkToRecord, Button } from 'react-admin';
import VisibilityIcon from '@material-ui/icons/Visibility';

const ShowButton = () => {
  const { basePath, record } = useEditContext();
  return (
    <Link to={linkToRecord(basePath, record?.id, 'show')}>
      <Button label="Afficher">
        <VisibilityIcon />
      </Button>
    </Link>
  );
};

export default ShowButton;
