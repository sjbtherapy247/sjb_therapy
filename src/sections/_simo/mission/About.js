import NextLink from 'next/link';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Container, Typography, Button, Unstable_Grid2 as Grid, Link } from '@mui/material';
// utils
import { fShortenNumber } from 'src/utils/formatNumber';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import CountUp from 'src/components/count-up';
import { bgGradient } from 'src/utils/cssStyles';

// ----------------------------------------------------------------------

// const COLORS = ['primary', 'secondary', 'warning', 'success'];

// const SUMMARY = [
//   { title: 'Years of experience', total: 12, icon: 'carbon:increase-level' },
//   { title: 'Awards', total: 20, icon: 'carbon:trophy' },
//   { title: 'Projects', total: 150, icon: 'carbon:data-vis-4' },
//   { title: 'Happy clients', total: 32000, icon: 'carbon:user-certification' },
// ];

// ----------------------------------------------------------------------

const StyledIcon = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ color, theme }) => ({
  width: 160,
  height: 160,
  margin: 'auto',
  display: 'flex',
  borderRadius: '30%',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  color: theme.palette[color].darker,
  border: `dashed 2px ${alpha(theme.palette[color].main, 0.25)}`,
  '&:before': {
    zIndex: 8,
    content: '""',
    borderRadius: '30%',
    position: 'absolute',
    width: 'calc(100% - 48px)',
    height: 'calc(100% - 48px)',
    background: `conic-gradient(from 0deg at 50% 50%, ${theme.palette[color].main} 0deg, ${theme.palette[color].light} 360deg)`,
  },
  '& svg': {
    zIndex: 9,
  },
}));

const StyledRoot = styled('div')(({ theme }) => ({
  // paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(8),
  ...bgGradient({
    color: alpha(theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800], 0.8),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
}));

const StyledBgImage = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 4),
  ...bgGradient({
    startColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 0.7)} 0%`,
    endColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 0.9)} 70%`,
    imgUrl: '/assets/images/travel/travel_1.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    ...bgGradient({
      direction: 'to left',
      startColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 0.7)} 0%`,
      endColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 1)} 100%`,
      imgUrl: '/assets/images/travel/travel_1.jpg',
    }),
  },
})); // ----------------------------------------------------------------------

export default function About() {
  const isMdUp = useResponsive('up', 'md');

  return (
    // <StyledRoot>
    <StyledBgImage>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid
          xs={12}
          md={10}
          lg={8}
          sx={{
            textAlign: { xs: 'center' },
            // textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2">Who We Are?</Typography>

          <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
            SjB Therapy is a hypnotherapy practice that is dedicated to helping people improve their lives. We use hypnosis to help people overcome a variety of challenges, including anxiety, depression, pain, addiction and also personal performance.
            <br />
            <br />
            We believe in hypnosis as it is a safe and effective way to make lasting changes, and we are fully committed to providing our clients with the highest quality care.
          </Typography>

          <Box sx={{ mt: 10 }}>
            {/* <m.div variants={varFade({ distance: 300 }).inUp}> */}
            <Typography variant="h3">Simply Just Believe</Typography>
            <Typography sx={{ mt: 1, color: 'text.secondary' }}>in</Typography>
            <Typography sx={{ mt: 1, color: 'text.secondary' }}>Yourself / Progress / Never Giving Up / Hypnotherapy / Possibilities</Typography>
            {/* </m.div> */}
          </Box>
          {/* <Button variant="outlined" color="inherit" size="large" endIcon={<Iconify icon="carbon:chevron-right" />}>
            Check Our Work
          </Button> */}
          <Link component={NextLink} href="/services/#hypnotherapyServices">
            <Button sx={{ mt: 4 }} variant="outlined">
              Our Services
            </Button>
          </Link>
        </Grid>
      </Grid>

      {/* <Box
        sx={{
          mt: 10,
          textAlign: 'center',
          display: 'grid',
          gap: { xs: 5, md: 8 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {SUMMARY.map((value, index) => (
          <div key={value.title}>
            <StyledIcon color={COLORS[index]}>
              <Iconify icon={value.icon} height={48} />
            </StyledIcon>

            <Typography variant="h2" sx={{ mt: 2, mb: 1 }}>
              <CountUp start={value.total / 5} end={value.total} formattingFn={(newValue) => fShortenNumber(newValue)} />
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>{value.title}</Typography>
          </div>
        ))}
      </Box> */}
    </StyledBgImage>
    // </StyledRoot>
  );
}
