import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Button, Box } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// config
import { NAV } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';
//
import EcommerceHeader from '../header';
import EcommerceAccountMenu from './EcommerceAccountMenu';

// ----------------------------------------------------------------------

EcommerceAccountLayout.propTypes = {
  children: PropTypes.node,
};

export default function EcommerceAccountLayout({ children }) {
  const isMdUp = useResponsive('up', 'md');

  const [menuOpen, setMemuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMemuOpen(true);
  };

  const handleMenuClose = () => {
    setMemuOpen(false);
  };

  return (
    <>
      <EcommerceHeader />

      <Container sx={{ my: 5 }}>
        <Typography variant="h3">Client Account</Typography>
      </Container>

      <Container>
        <Stack direction={{ md: 'row' }} alignItems={{ md: 'flex-start' }} sx={{ mb: { xs: 8, md: 10 } }}>
          <EcommerceAccountMenu open={menuOpen} onClose={handleMenuClose} />

          <Box sx={{ flexGrow: 1, pl: { md: 8 }, width: { md: `calc(100% - ${NAV.W_DRAWER}px)` } }}>{children}</Box>
        </Stack>
      </Container>
    </>
  );
}
