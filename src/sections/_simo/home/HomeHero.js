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
                <Typography variant="h1">Hypnotherapy Sydney</Typography>
               
              </div>
              <div>
                <Typography variant="h3">TRANCEform Your Life</Typography>
                <Typography variant="h4">With Hypnosis</Typography>
              </div>

              <Typography color="text.secondary">
                Hi, I&apos;m Simon Baker - The Hypnotherapist, not the Mentalist! 
                <br />
                <br />
                Whether you&apos;ve arrived here because you&apos;re facing a challenge or seeking to unlock your true potential, know that you&apos;re in the right place and I will do everything to help you achieve your goals.
                <br />
                <br />
                If you&apos;re based in Sydney then we can meet face to face and if you&apos;re not, then that&apos;s fine, as we can meet virtually.
                <br />
                <br />
                Book in your <bold>FREE</bold> discovery session below and let&apos;s TRANCEform your life today.
              </Typography>

              <Link component={NextLink} rel="noopener" href="/services#hypnotherapyPackages">
                <Button color="primary" size="large" variant="contained" endIcon={<Iconify icon="carbon:launch" />}>
                  BOOK Your Free Discovery Call
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
