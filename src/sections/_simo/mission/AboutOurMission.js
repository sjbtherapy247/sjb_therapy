// @mui
import styled from '@emotion/styled';
import { Stack, Container, Typography, Card, Unstable_Grid2 as Grid, alpha } from '@mui/material';
// components
// import Image from 'src/components/image';
import { bgGradient } from 'src/utils/cssStyles';

// ----------------------------------------------------------------------

const VISIONS = [
  {
    name: 'Healing',
    description: 'We believe in the power of the mind to heal.',
  },
  {
    name: 'Learning',
    description: 'We are committed to continuous learning and improvement.',
  },
  { name: 'Passion', description: 'We are passionate about helping people improve their lives' },
];

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(6, 0),
  paddingTop: '66px',
  ...bgGradient({
    startColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 0.7)} 0%`,
    endColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 0.9)} 70%`,
    imgUrl: '/assets/images/simon/mission.jpeg',
  }),
  [theme.breakpoints.up('md')]: {
    ...bgGradient({
      direction: 'to right',
      startColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 0.7)} 0%`,
      endColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 1)} 100%`,
      imgUrl: '/assets/images/simon/mission.jpeg',
    }),
  },
}));

// ----------------------------------------------------------------------

export default function AboutOurMission() {
  return (
    <StyledRoot>
      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 4, md: 5 },
          px: { xs: 2, md: 5 },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            // maxWidth: 466,
            mb: { xs: 2, md: 3 },
            mx: { xs: 'auto', md: 'unset' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2">Our Mission</Typography>

          <Typography sx={{ color: 'text.secondary' }}>Empowering individuals on their journey towards positive transformation and holistic well-being.</Typography>
        </Stack>

        <Grid container justifyContent="flex-start">
          {/* <Grid xs={12} md={3} lg={5}>
            <Image alt="vision" src="/assets/illustrations/illustration_vision.svg" />
          </Grid> */}

          <Grid xs={12} md={8} lg={6}>
            <Stack alignItems={{ md: 'flex-end' }} sx={{ position: 'relative' }}>
              {VISIONS.map((vision, index) => {
                const { name, description } = vision;

                const firstVision = index === 0;

                const secondVision = index === 1;

                const thirdVision = index === 2;

                return (
                  <Card
                    key={name}
                    sx={{
                      p: 4,
                      mt: 2,
                      width: { md: 'calc(50% - 16px)' },
                      ...(firstVision && {
                        top: { md: 0 },
                        left: { md: 0 },
                        bottom: { md: 0 },
                        my: { md: 'auto' },
                        boxShadow: { md: 12 },
                        maxHeight: { md: 280 },
                        display: { md: 'flex' },
                        position: { md: 'absolute' },
                        flexDirection: { md: 'column' },
                        justifyContent: { md: 'center' },
                      }),
                      ...(secondVision && {
                        boxShadow: (theme) => ({ md: theme.customShadows.z24 }),
                      }),
                      ...(thirdVision && {
                        boxShadow: { md: 0 },
                      }),
                    }}
                  >
                    <Typography variant="h1" component="h2" sx={{ color: 'text.disabled', opacity: 0.5, mb: 3 }}>
                      {`0${index + 1}`}
                    </Typography>

                    <Typography variant="h4" paragraph>
                      {name}
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', opacity: 0.75 }}>{description}</Typography>
                  </Card>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
