import { Box, BoxProps } from '@chakra-ui/layout';
import React from 'react';

export const Centre: React.FC<BoxProps> = (props) => {
  return (
    <Box d="flex" justifyContent="center" alignItems="center" {...props} />
  );
};
