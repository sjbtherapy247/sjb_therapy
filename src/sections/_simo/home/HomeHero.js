import NextLink from 'next/link';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, Button, Container, Typography, Grid, Link, Box } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import Iconify from 'src/components/iconify';
import dynamic from 'next/dynamic';

// Dynamically load the HomeSimon component
const HomeSimon = dynamic(() => import('./HomeSimon'), { ssr: false });

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
        minHeight: '100vh', // Ensures it takes full viewport height
        pt: { xs: 8, md: 8 }, // Padding to prevent the top content from being cut off by the menu
      }}
    >
      <Container
        sx={{
          p: 0,
          height: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on desktop
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Left Section: Text content */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            px: { xs: 2, md: 5 },
            textAlign: { xs: 'center', md: 'left' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', md: 'flex-start' },
            py: { xs: 4, md: 4 },
          }}
        >
          <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.2 }}>
            Hypnotherapy Sydney
          </Typography>

          <Box>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
              TRANCEform Your Life
            </Typography>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
              With Hypnosis
            </Typography>
          </Box>

          <Typography color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, mt: 2 }}>
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

          <Link component={NextLink} href="/services#hypnotherapyPackages" underline="none" sx={{ mt: 4 }}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              endIcon={<Iconify icon="carbon:launch" />}
              sx={{ fontSize: { xs: '1rem', md: '1rem' } }}
            >
              BOOK Your Free Discovery Call
            </Button>
          </Link>
        </Box>

        {/* Right Section: HomeSimon */}
        <Box
          sx={{
            width: { xs: '80%', md: '50%' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: { xs: 4, md: 3 }, // Adds spacing above HomeSimon on mobile
          }}
        >
          <HomeSimon sx={{ width: '100%', maxWidth: 400, height: 'auto' }} />
        </Box>
      </Container>
    </Box>
  );
}
