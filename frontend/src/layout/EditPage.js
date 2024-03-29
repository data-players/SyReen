import React from 'react';
import { useEditContext, Toolbar, SaveButton } from 'react-admin';
import { Container, Typography, Card, Box, Grid, useMediaQuery } from '@material-ui/core';

const NoDeleteToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const EditPage = ({ undoable, mutationMode, title, actions, className, hasDelete = true, customToolbar=undefined, children, ...rest }) => {
  const {
    basePath,
    defaultTitle,
    // hasList,
    // hasShow,
    record,
    redirect,
    resource,
    save,
    saving,
    version,
  } = useEditContext(rest);
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });

  if (!record) return null;

  return (
    <Container maxWidth="md">
      <Card>
        <Box p={{ xs: 2, md: 3 }}>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h2" style={{ marginBottom: 10 }}>
                {React.isValidElement(title) ? React.cloneElement(title, { record }) : title || defaultTitle}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="flex-end" alignItems="flex-end" flexDirection={xs ? 'column' : 'row'} flexWrap="wrap">
                {actions}
              </Box>
            </Grid>
          </Grid>
          {React.cloneElement(React.Children.only(children), {
            resource,
            basePath,
            record,
            saving,
            save,
            undoable,
            mutationMode,
            version,
            redirect,
            component: 'div',
            toolbar: customToolbar || <NoDeleteToolbar />,
          })}
        </Box>
      </Card>
    </Container>
  );
};

export default EditPage;
