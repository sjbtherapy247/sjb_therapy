// next
import NextLink from 'next/link';
// @mui
import { Link, Stack, Divider, Typography, Box } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// components
import Logo from 'src/components/logo';
//
import { AuthWithSocial, AuthCarousel, AuthLoginForm } from '../components';

// ----------------------------------------------------------------------

export default function LoginCoverView() {
  return (
    <Stack direction="row" sx={{ minHeight: 1 }}>
      <Box
        sx={{
          width: { xs: 1, md: 480 },
          p: (theme) => ({
            xs: theme.spacing(4, 2),
            md: theme.spacing(5, 10),
          }),
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Logo />
        </Box>
        <Stack
          sx={{
            pb: 5,
            pt: { xs: 5, md: 5 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h3" paragraph>
            Client Login
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Don’t have an account? `}
            <Link component={NextLink} href="/services/#hypnotherapyServices" variant="subtitle2" color="primary">
              Book your free session
            </Link>
          </Typography>
        </Stack>

        {/* <AuthWithSocial />

        <Divider sx={{ py: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            OR
          </Typography>
        </Divider> */}

        <AuthLoginForm />
      </Box>

      <AuthCarousel
        title="Welcome Back"
        images={[
          '/assets/sjb-logo/Hmobile.jpg',
          '/assets/sjb-logo/Hdocs-large.jpg',
          // '/assets/sjb-logo/Smobile.jpg',
          // '/assets/sjb-logo/Sdoco-large.jpg',
        ]}
      />
    </Stack>
  );
}
