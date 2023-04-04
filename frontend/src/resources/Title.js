import React from 'react';

const Title = ({ record }) => {
  return <span>{record?.['syreen:label']}</span>;
};

export default Title;
