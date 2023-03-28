  
import React from 'react';
import { Box, Typography } from '@material-ui/core';

const OfferListEmpty = () => (
  <Box textAlign="center" mt={5}>
      <Typography paragraph>
        Aucune offre disponible actuellement.
      </Typography>
  </Box>
);

export default OfferListEmpty;