import React, { useMemo } from 'react';
import { useListContext } from 'react-admin';
import { Box, CircularProgress } from '@material-ui/core';
import CardItem from './CardItem.js';

const CardsList = ({ CardComponent, link, setLoaded }) => {
  const { data, loading, loaded } = useListContext();
  if (loaded && setLoaded) {
    setLoaded();
  }
  const ids = useMemo(() => Object.values(data).map(d => d.id), [data]);
  return loading ? (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    ids
      .filter((id) => data[id])
      .map((id) => {
        return (
          <CardItem key={id} record={data[id]} CardComponent={CardComponent} />
        );
      })
  );
};

CardsList.defaultProps = {
  link: 'show',
};

export default CardsList;
