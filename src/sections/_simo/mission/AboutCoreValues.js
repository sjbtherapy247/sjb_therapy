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
    description: 'Gain control over your mental health, permanently.',
    icon: '/assets/icons/ic_optimization.svg',
  },
  {
    title: 'Action',
    description: 'Take action to overcome your current situation.',
    icon: '/assets/icons/ic_transparency.svg',
  },
  {
    title: 'Transform & Grow',
    description: 'Become the very best version of yourself.',
    icon: '/assets/icons/ic_reputation.svg',
  },
  {
    title: 'Teamwork',
    description: 'By us working together, you will become stronger.',
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
      <Typography variant="h2">Our Core Values</Typography>
      <Typography
        sx={{
          mt: 1,
          mb: { xs: 8, md: 10 },
          color: 'text.secondary',
          textAlign: 'center',
          // maxWidth: { md: 540 },
        }}
      >
        Our core value revolves around unlocking the potential in every client. We are dedicated to helping individuals harness their inner abilities, overcome limitations, and achieve peak performance through the power of clinical hypnotherapy.
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
          <m.div key={value.title} variants={varFade({ distance: 300 }).inDown}>
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
      <Box sx={{ mt: 10 }}>
        <m.div variants={varFade({ distance: 300 }).inUp}>
          <Typography variant="h3">Simply Just Believe</Typography>
          <Typography sx={{ mt: 1, color: 'text.secondary' }}>in</Typography>
          <Typography sx={{ mt: 1, color: 'text.secondary' }}>Hypnotherapy / Yourself / Progress / Never Giving Up</Typography>
        </m.div>
      </Box>
    </Container>
  );
}
