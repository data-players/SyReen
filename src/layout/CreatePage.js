import React from 'react';
import { useCreateContext } from 'react-admin';
import { Container, Typography, Card, Box, Grid, useMediaQuery } from '@material-ui/core';

const CreatePage = ({ title, actions, children, customToolbar=undefined, ...rest }) => {
  const createContext = useCreateContext(rest);
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  return (
    <Container maxWidth="md">
      <Card>
        <Box p={3}>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h2">{title}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="flex-end" alignItems="flex-end" flexDirection={xs ? 'column' : 'row'}>
                {actions}
              </Box>
            </Grid>
          </Grid>
          {React.cloneElement(children, { ...createContext, component: 'div', toolbar: customToolbar })}
        </Box>
      </Card>
    </Container>
  );
};

export default CreatePage;
