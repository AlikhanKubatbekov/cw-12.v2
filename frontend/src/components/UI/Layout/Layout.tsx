import React from 'react';
import { Container, Typography } from '@mui/material';
import TopNavigation from '../TopNavigation/TopNavigation';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Typography component="header" marginBottom="90px">
        <TopNavigation />
      </Typography>
      <Typography component="main">
        <Container maxWidth="xl">{children}</Container>
      </Typography>
    </>
  );
};

export default Layout;
