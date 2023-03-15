import React from 'react';
import { SimpleList } from 'react-admin';
import HomeIcon from '@material-ui/icons/Home';
import List from '../../layout/profile/List';

const LocationList = (props) => {
  return (
    <List title="Mes adresses" perPage={1000} {...props}>
      <SimpleList
        primaryText={(record) => record['vcard:given-name']}
        secondaryText={(record) => record['vcard:hasAddress']?.['vcard:given-name']}
        leftAvatar={() => <HomeIcon />}
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

export default LocationList;
