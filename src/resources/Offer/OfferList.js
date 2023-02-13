import React, { useMemo } from 'react';
import { Box, Typography, Container, Card as MuiCard, makeStyles } from '@material-ui/core';
import { List, ReferenceInput, SelectInput, TextInput } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import CardsList from '../../commons/lists/CardsList';
import OfferCard from './OfferCard';

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
  useCheckAuthenticated();
  /*
  const sparqlWhere = useMemo(() => {
    const now = new Date();
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
                  value: 'http://virtual-assembly.org/ontologies/pair-mp#hasTimeCondition',
                },
                object: { termType: 'Variable', value: 'hasTimeCondition' },
              },
              {
                subject: { termType: 'Variable', value: 'hasTimeCondition' },
                predicate: {
                  termType: 'NameNode',
                  value: 'http://virtual-assembly.org/ontologies/pair-mp#expirationDate',
                },
                object: { termType: 'Variable', value: 'expirationDate' },
              },
            ],
          },
        ],
      },
      {
        type: 'filter',
        expression: {
          type: 'operation',
          operator: '||',
          args: [
            {
              type: 'operation',
              operator: '!',
              args: [
                {
                  type: 'operation',
                  operator: 'bound',
                  args: [
                    {
                      termType: 'Variable',
                      value: 'expirationDate',
                    },
                  ],
                },
              ],
            },
            {
              type: 'operation',
              operator: '>',
              args: [
                {
                  termType: 'Variable',
                  value: 'expirationDate',
                },
                {
                  termType: 'Literal',
                  datatype: {
                    termType: 'NamedNode',
                    value: 'http://www.w3.org/2001/XMLSchema#dateTime',
                  },
                  value: now.toISOString(),
                },
              ],
            },
          ],
        },
      },
    ];
  }, []);
  */
  const offerFilters = [
    <TextInput source="q" label="Rechercher des annonces" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  ];

  return (
    <Container maxWidth="md" className={classes.root2}>
      <Box mb={2}>
        <MuiCard>
          <Box p={2}>
            <Typography variant="h5">Bienvenue sur SyRéen !</Typography>
            <Typography variant="body1">SyRéen est une application de réutilisation de rebus de chantier</Typography>
          </Box>
        </MuiCard>
      </Box>
      <List
        resource="offers"
        basePath="/offers"
        perPage={1000}
        sort={{ field: 'dc:created', order: 'DESC' }}
        filters={offerFilters}
        actions={false}
        className={classes.list}
      >
        <CardsList CardComponent={OfferCard} link="show" />
      </List>
    </Container>
  );
};

export default OfferList;
