import React from 'react';
import { SimpleList, useGetIdentity } from 'react-admin';
import NotificationsIcon from '@material-ui/icons/Notifications';
import List from '../../layout/profile/List';

const AlertList = (props) => {
  const { identity } = useGetIdentity();
  if (!identity?.id) return null;
  return (
    <List title="Mes alertes" perPage={1000} filter={{ 'syreen:actor': identity.id }}  {...props}>
      <SimpleList
        primaryText={(record) => record['syreen:label']}
        leftAvatar={() => <NotificationsIcon />}
        rowStyle={() => ({
          backgroundColor: 'white',
          padding: 8,
          marginBottom: 8,
          boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        })}
      />
    </List>
  );
}

export default AlertList;
