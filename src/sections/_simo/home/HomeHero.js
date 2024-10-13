import NextLink from 'next/link';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, Button, Container, Typography, Link, Box } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import dynamic from 'next/dynamic';
// Iconify static imports
import { Icon } from '@iconify/react';
import launchIcon from '@iconify/icons-carbon/launch';

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
        minHeight: '90vh', // Full viewport height
        pt: { xs: 8, md: 8 }, // Prevents content from being cut off
      }}
    >
      <Container
        sx={{
          p: 2,
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
            width: { xs: '100%', md: '60%' },
            px: { xs: 2, md: 4 },
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

          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography color="text.secondary" sx={{ fontSize: { xs: '1.1rem', md: '1.1rem' } }}>
              Hi, I&apos;m Simon Baker - The Hypnotherapist, not the Mentalist!
            </Typography>

            <Typography color="text.secondary" sx={{ fontSize: { xs: '1.1rem', md: '1.1rem' } }}>
              Whether you&apos;ve arrived here because you&apos;re facing a challenge or seeking to unlock your true potential, know that you&apos;re in the right place and I will do everything to help you achieve your goals.
            </Typography>

            <Typography color="text.secondary" sx={{ fontSize: { xs: '1.1rem', md: '1.1rem' } }}>
              If you&apos;re based in Sydney, we can meet face to face. If you&apos;re not, that&apos;s fine too, as we can meet virtually.
            </Typography>

            <Typography color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              Book in your <strong>FREE</strong> discovery session below and let&apos;s TRANCEform your life today.
            </Typography>
          </Stack>

          <Link component={NextLink} href="/services#hypnotherapyPackages" underline="none" sx={{ mt: 4 }}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              endIcon={<Icon icon={launchIcon} />}
              sx={{ fontSize: { xs: '1rem', md: '1rem' } }}
            >
              BOOK Your Free Discovery Call
            </Button>
          </Link>
        </Box>

        {/* Right Section: HomeSimon */}
        <Box
          sx={{
            width: { xs: '80%', md: '60%' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: { xs: 3, md: 2 },
            pb: { xs: 2, md: 2 },
          }}
        >
          <HomeSimon sx={{ width: '100%', maxWidth: 400, height: 'auto' }} />
        </Box>
      </Container>
    </Box>
  );
}
