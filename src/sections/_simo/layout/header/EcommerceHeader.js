import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Container, IconButton } from '@mui/material';
// hooks
// utils
import { bgGradient } from 'src/utils/cssStyles';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.9),
    imgUrl: '/assets/background/overlay_1.jpg',
  }),
}));

// ----------------------------------------------------------------------

export default function EcommerceHeader() {
  return (
    <StyledRoot>
      <Container
        sx={{
          // mt: 8,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          height: { xs: 64, md: 64 },
        }}
      >
        {/* <Stack spacing={3} direction="row" alignItems="center" flexGrow={1} justifyContent="flex-end">
          {!isMdUp && (
            <IconButton size="small" color="inherit" sx={{ p: 0 }}>
              <Iconify icon="carbon:search" width={24} />
            </IconButton>
          )}

          <Badge badgeContent={2} color="info">
            <IconButton component={NextLink} href={paths.eCommerce.wishlist} size="small" color="inherit" sx={{ p: 0 }}>
              <Iconify icon="carbon:favorite" width={24} />
            </IconButton>
          </Badge>

          <Badge badgeContent={4} color="error">
            <IconButton component={NextLink} href={paths.eCommerce.cart} size="small" color="inherit" sx={{ p: 0 }}>
              <Iconify icon="carbon:shopping-cart" width={24} />
            </IconButton>
          </Badge>

          <IconButton component={NextLink} href={paths.eCommerce.account.personal} size="small" color="inherit" sx={{ p: 0 }}>
            <Iconify icon="carbon:user" width={24} />
          </IconButton>
        </Stack> */}
      </Container>
    </StyledRoot>
  );
}
