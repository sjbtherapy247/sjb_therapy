// next
import NextLink from 'next/link';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Stack, Button, Container, Typography, Unstable_Grid2 as Grid, Link } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// routes
// import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import HomeSimon from './HomeSimon';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.85),
    imgUrl: '/assets/images/simon/20230513_145715.jpg',
    // imgUrl: '/assets/background/overlay_2.jpg',
  }),
  position: 'relative',
  overflow: 'hidden',
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <StyledRoot>
      <Container sx={{ p: 0 }}>
        <Grid container columnSpacing={3} alignItems="center" sx={{ height: 1 }}>
          <Grid xs={12} md={6} sx={{ px: 4 }}>
            <Stack
              spacing={4}
              justifyContent="center"
              alignItems={{ xs: 'center', md: 'flex-start' }}
              sx={{
                py: { xs: 10, md: 12 },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <div>
                <Typography variant="h3">Simply Just Believe</Typography>
                <Typography variant="h5">sjb.hypnotherapy</Typography>
              </div>
              <div>
                <Typography variant="h2">Unlock Your Mind</Typography>
                <Typography variant="h4">Embrace Your Potential</Typography>
              </div>

              <Typography color="text.secondary">
                Hi, I&apos;m Simon, welcome to sjb.hypnotherapy, I&apos;m glad you&apos;ve found your way here. Whether you&apos;ve arrived because you’re facing a challenge or seeking to unlock your true potential, know that you&apos;re in the right
                place and you don&apos;t have to face things alone.
                <br />
                <br />
                Together, we can discover the solutions and strategies that will empower you to overcome obstacles and unlock your full potential. Please book your free 15-minute consultation so we can explore the best path forward together and let
                your tomorrow begin today.
              </Typography>

              <Link component={NextLink} rel="noopener" href="/services#hypnotherapyPackages">
                <Button color="primary" size="large" variant="contained" endIcon={<Iconify icon="carbon:launch" />}>
                  Your Free Initial Consultation
                </Button>
              </Link>
            </Stack>
          </Grid>

          <Grid xs={12} md={6} sx={{ pb: { xs: 4, md: 0 }, display: 'flex', justifyContent: 'center' }}>
            <HomeSimon />
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
