// next
import NextLink from 'next/link';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, Button, Container, Typography, Grid, Link, Box } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import Iconify from 'src/components/iconify';
import HomeSimon from './HomeSimon';

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <Box
      sx={{
        ...bgGradient({
          color: (theme) => alpha(theme.palette.background.default, 0.85),
          imgUrl: '/assets/images/simon/20230513_145715.jpg',
        }),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
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
              <Typography variant="h1">Hypnotherapy Sydney</Typography>

              <Box>
                <Typography variant="h3">TRANCEform Your Life</Typography>
                <Typography variant="h4">With Hypnosis</Typography>
              </Box>

              <Typography color="text.secondary">
                Hi, I&apos;m Simon Baker - The Hypnotherapist, not the Mentalist!
                <br />
                <br />
                Whether you&apos;ve arrived here because you&apos;re facing a challenge or seeking to unlock your true potential,
                know that you&apos;re in the right place and I will do everything to help you achieve your goals.
                <br />
                <br />
                If you&apos;re based in Sydney, we can meet face to face. If you&apos;re not, that&apos;s fine too,
                as we can meet virtually.
                <br />
                <br />
                Book in your <strong>FREE</strong> discovery session below and let&apos;s TRANCEform your life today.
              </Typography>

              <Link component={NextLink} href="/services#hypnotherapyPackages" underline="none">
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  endIcon={<Iconify icon="carbon:launch" />}
                >
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
    </Box>
  );
}
