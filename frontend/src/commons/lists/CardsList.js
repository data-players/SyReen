import React, { useMemo, useEffect } from 'react';
import { useListContext, useGetIdentity } from 'react-admin';
import { Box, CircularProgress } from '@material-ui/core';
import CardItem from './CardItem.js';

const CardsList = ({ CardComponent, link, setLoaded, showCreatorItemsOnly=false }) => {
  const { data, loading, loaded } = useListContext();
  const ids = useMemo(() => Object.values(data).map(d => d.id), [data]);
  const { identity } = useGetIdentity();
  useEffect(() => {
    if (loaded && setLoaded) {
      setLoaded();
    }
  }, [loaded, setLoaded])
  return loading ? (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    ids
      .filter((id) => {
        if (!showCreatorItemsOnly || (identity && identity.id === data[id]["dc:creator"]))  {
          return data[id];
        } else {
          return false;
        }
      })
      .map((id) => 
        <CardItem key={id} record={data[id]} CardComponent={CardComponent} />
      )
  );
};

CardsList.defaultProps = {
  link: 'show',
};

export default CardsList;
