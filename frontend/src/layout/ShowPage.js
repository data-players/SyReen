import React from 'react';
import { useLocation } from 'react-router';
import { useShowContext } from 'react-admin';
import { Container, Typography, Card, Box, Grid, useMediaQuery } from '@material-ui/core';
import IntegratedImageField from '../commons/fields/IntegratedImageField';

const ShowPage = ({ title, defaultTitle, details, actions, children, ...rest }) => {
  const showContext = useShowContext(rest);
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  const location = useLocation();
  const isOnFirstTab = ! location.pathname.match('.*[1-9]$');
  return (
    <Container maxWidth="md">
      <Card>
        <Box p={{ xs: 2, md: 3 }}>
          <Grid container>
            <Grid item xs={10} sm={8}>
              <Typography variant="h2">
                {React.isValidElement(title)
                  ? React.cloneElement(title, { record: showContext.record })
                  : title || showContext.defaultTitle}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4}>
              <Box display="flex" justifyContent="flex-end" alignItems="flex-end" flexDirection={xs ? 'column' : 'row'} flexWrap="wrap">
                {actions}
              </Box>
            </Grid>
          </Grid>
          { isOnFirstTab && showContext?.record?.["syreen:depictedBy"] &&
            <IntegratedImageField source="syreen:depictedBy" title="syreen:label" />
          }
          <Box display={xs ? 'block' : 'flex'} pt={2} pb={2}>
            {React.cloneElement(details, { orientation: xs ? 'vertical' : 'horizontal' })}
          </Box>
          {React.cloneElement(children, { ...showContext, component: 'div' })}
        </Box>
      </Card>
    </Container>
  );
};

export default ShowPage;
