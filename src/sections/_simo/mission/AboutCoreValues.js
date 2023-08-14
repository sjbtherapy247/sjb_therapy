// animation
import { m } from 'framer-motion';
import { MotionViewport, varFade } from 'src/components/animate';
// @mui
import { Typography, Container, Box } from '@mui/material';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const CORE_VALUES = [
  {
    title: 'Mental Health',
    description: 'Re-gain control over your mental health, permanently.',
    icon: '/assets/images/simon/asset-37.png',
  },
  {
    title: 'Action',
    description: 'Take action to overcome your current situation.',
    icon: '/assets/icons/ic_transparency.svg',
  },
  {
    title: 'Transform & Grow',
    description: 'Evolve in ways you never dreamt possible.',
    icon: '/assets/icons/ic_reputation.svg',
  },
  {
    title: 'Teamwork',
    description: 'We work together, and you achieve great things.',
    icon: '/assets/icons/ic_popularity.svg',
  },
];

// ----------------------------------------------------------------------

export default function AboutCoreValues() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        textAlign: 'center',
        pt: { xs: 5, md: 10 },
        pb: { xs: 5, md: 15 },
      }}
    >
      <Typography sx={{ mb: 4 }} variant="h2">
        Our Core Values
      </Typography>
      <Typography
        sx={{
          mt: 1,
          mb: { xs: 8, md: 10 },
          color: 'text.secondary',
          textAlign: 'center',
          // maxWidth: { md: 540 },
        }}
      >
        Our core values revolve around unlocking the potential in every client. We are dedicated to helping individuals heal and harness their inner abilities, overcome limitations, and achieve peak performance through the power of clinical
        hypnotherapy.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 8,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {CORE_VALUES.map((value) => (
          <m.div key={value.title} variants={varFade({ distance: 300 }).inUp}>
            {/* <Box key={value.title}> */}
            <SvgColor src={value.icon} sx={{ width: 64, height: 64, mx: 'auto', color: 'primary.main' }} />

            <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
              {value.title}
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}> {value.description} </Typography>
            {/* </Box> */}
          </m.div>
        ))}
      </Box>
    </Container>
  );
}
