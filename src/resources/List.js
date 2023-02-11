import React, { useMemo } from 'react';
import { Box, Typography, Container, Card as MuiCard } from '@material-ui/core';
import { ListBase, useTranslate } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import CardsList from '../commons/lists/CardsList';
import ProjectCard from './Project/ProjectCard';

const List = () => {
  useCheckAuthenticated();
  const translate = useTranslate();

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

  return (
    <Container maxWidth="md">
      <Box mb={2}>
        <MuiCard>
          <Box p={2}>
            <Typography variant="h5">Bienvenue sur SyRéen !</Typography>
            <Typography variant="body1">SyRéen est une application de réutilisation de rebus de chantier</Typography>
          </Box>
        </MuiCard>
      </Box>
      <ListBase
        resource="projects"
        basePath="/projects"
        perPage={1000}
        sort={{ field: 'dc:created', order: 'DESC' }}
        filter={{ sparqlWhere }}
      >
        <CardsList CardComponent={ProjectCard} link="show" />
      </ListBase>
    </Container>
  );
};

export default List;
