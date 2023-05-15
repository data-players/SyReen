import React from 'react';
import { CreateButton, SimpleList } from 'react-admin';
import { Avatar, Box, Container, useMediaQuery } from "@material-ui/core";
import { useCheckAuthenticated } from '@semapps/auth-provider';
import { AvatarWithLabelField } from '@semapps/field-components';
import { GridList } from '@semapps/list-components';
import List from "../../layout/profile/List";
import { formatUsername } from "../../utils";
import ContactRequestsBlock from "../../commons/blocks/profile/ContactRequestsBlock";
import SyreenGroupBlock from "../../commons/blocks/SyreenGroupBlock";

const ProfileList = (props) => {
  const { identity } = useCheckAuthenticated();
  const xs = useMediaQuery(theme => theme.breakpoints.down('xs'), { noSsr: true });
  if (!identity?.id) return null;
  return (
    <>
      <Container maxWidth="md">
        <SyreenGroupBlock />
      </Container>
      <List
        title='Mon réseau'
        actions={[<CreateButton label='Envoyer une demande' color="primary" />]}
        sort={{ field: 'vcard:given-name', order: 'ASC' }}
        perPage={1000}
        {...props}
      >
          {xs ?
            <>
              <ContactRequestsBlock />
              <SimpleList
                primaryText={record => record['vcard:given-name']}
                secondaryText={record => formatUsername(record.describes)}
                leftAvatar={record => (<Avatar src={record['vcard:photo']}>{record['vcard:given-name']?.toUpperCase()?.[0]}</Avatar>)}
                linkType="show"
                rowStyle={(record, index) => ({
                  backgroundColor: 'white',
                  padding: 8,
                  marginBottom: 8,
                  boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
                })}
              />
            </>
            :
            <>
              <ContactRequestsBlock />
              <Box pt={1}>
                <GridList sm={2} linkType="show">
                  <AvatarWithLabelField
                    label="vcard:given-name"
                    image="vcard:photo"
                    defaultLabel='Inconnu'
                    labelColor="grey.300"
                  />
                </GridList>
              </Box>
            </>
          }
      </List>
    </>
  );
}

export default ProfileList;
