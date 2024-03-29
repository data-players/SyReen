import React, { useMemo, useState } from 'react';
import { Box, Typography, Container, Card as MuiCard, makeStyles } from '@material-ui/core';
import { List, ReferenceInput, SelectInput, TextInput, useGetIdentity } from 'react-admin';
import CardsList from '../../commons/lists/CardsList';
import OfferCard from './OfferCard';
import OfferListEmpty from './OfferListEmpty';

const useStyles = makeStyles((theme) => ({
  root2: {
    '& .list-page': {
      '& > .MuiToolbar-root': {
          marginTop: 32,
          marginBottom: 16,
          padding: 0,
          background: 'transparent',
        '& form': {
          width: '100%',
          '& label': {
            top: 6,
            '&.Mui-focused': {
              top: 2
            }
          },
          '& input': {
            backgroundColor: theme.palette.primary.contrastText,
            fontSize: 18,
            borderRadius: 10,
            paddingTop: 29,
            paddingBottom: 12,
          },
          '& .MuiFilledInput-underline:before': {
            display: 'none'
          },
          '& div': {
            width: '100%'
          },
          '& ~ span': {
            display: 'none'
          },
          '& .filter-field > div:not(:first-child)': {
            display: 'none'
          },
        }
      }
    },
  },
  list: {
    '& > div > .MuiPaper-root': {
      backgroundColor: 'transparent'
    }
  }
}));

const OfferList = () => {
  const classes = useStyles();
  const { loading, identity } = useGetIdentity();
  
  const sparqlWhere = useMemo(() => {
    if (! identity?.id) {
       return null;
    } else {
      return [
        {
          type: 'optional',
          patterns: [
            {
              type: 'bgp',
              triples: [
                {
                  subject: { termType: 'Variable', value: 's1' },
                  predicate: {
                    termType: 'NameNode',
                    value: 'http://purl.org/dc/terms/creator',
                  },
                  object: { termType: 'Variable', value: 'creator' },
                },
              ],
            },
          ],
        },
        {
          type: 'filter',
          expression: {
            type: 'operation',
            operator: '!=',
            args: [
              {
                termType: 'Variable',
                value: 'creator',
              },
              {
                termType: 'NamedNode',
                value: identity.id,
              },
            ],
          },
        },
      ];
    }
  }, [identity]);

  const [loaded, setLoaded] = useState(false);
  const offerFilters = useMemo(() => {
    if (loaded) {
      return [
        <TextInput source="q" label="Rechercher des annonces" alwaysOn={true} />,
        <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
          <SelectInput optionText="name" />
        </ReferenceInput>
      ];
    } else {
      return [];
    }
  }, [loaded]);

  return (
    <Container maxWidth="md" className={classes.root2}>
      <Box mb={2}>
        <MuiCard>
          <Box p={2}>
            <Typography variant="h5">Bienvenue sur {process.env.REACT_APP_NAME} !</Typography>
            <Typography variant="body1">{process.env.REACT_APP_DESCRIPTION}</Typography>
          </Box>
        </MuiCard>
      </Box>
      { !loading && 
        <List
          resource="offers"
          basePath="/offers"
          perPage={1000}
          sort={{ field: 'dc:created', order: 'DESC' }}
          filters={offerFilters}
          filter={{ sparqlWhere }}
          actions={false}
          className={classes.list}
          empty={<OfferListEmpty />}
        >
          <CardsList CardComponent={OfferCard} setLoaded={() => setLoaded(true)} />
        </List>
      }
    </Container>
  );
};

export default OfferList;
