import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Button, Box, alpha, styled } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// config
import { NAV } from 'src/config-global';
// components
// import Iconify from 'src/components/iconify';
//
import { bgGradient } from 'src/utils/cssStyles';
import AccountMenu from './AccountMenu';

// ----------------------------------------------------------------------

AccountLayout.propTypes = {
  children: PropTypes.node,
};

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.9),
    imgUrl: '/assets/background/overlay_1.jpg',
  }),
}));

export default function AccountLayout({ children }) {
  const isMdUp = useResponsive('up', 'md');

  return (
    <>
      <StyledRoot>
        {/* menu background */}
        <Container sx={{ display: 'flex', alignItems: 'center', position: 'relative', height: { xs: 64 } }} />
      </StyledRoot>

      <Container sx={{ my: 5 }}>
        <Typography variant="h3">Client Account</Typography>
      </Container>

      <Container>
        <Stack direction={{ md: 'row' }} alignItems={{ md: 'flex-start' }} sx={{ mb: { xs: 8, md: 10 } }}>
          <AccountMenu />

          <Box sx={{ flexGrow: 1, pl: { md: 8 }, width: { md: `calc(100% - ${NAV.W_DRAWER}px)` } }}>{children}</Box>
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
