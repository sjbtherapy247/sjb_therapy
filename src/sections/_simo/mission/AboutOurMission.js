// @mui
import styled from '@emotion/styled';
import { Stack, Container, Typography, Card, Unstable_Grid2 as Grid, alpha, useTheme } from '@mui/material';
// components
// import Image from 'src/components/image';
import { bgGradient } from 'src/utils/cssStyles';

// ----------------------------------------------------------------------

const VISIONS = [
  {
    name: 'Healing',
    description: 'I belive that ones mind can heal people faster than anything else .',
  },
  {
    name: 'Learning',
    description: 'I am committed to continuous learning and improvement.',
  },
  { name: 'Passion', 
    description: 'I am passionate about helping people overcome their obstacles.' },
];

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(6, 0),
  paddingTop: '66px',
  ...bgGradient({
    direction: 'to top',
    startColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 0.4)} 0%`,
    endColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 0.87)} 70%`,
    imgUrl: '/assets/images/simon/snowies-sunset-tezd.jpeg',
  }),
  [theme.breakpoints.up('md')]: {
    ...bgGradient({
      direction: 'to left',
      startColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 700 : 900], 0.5)} 0%`,
      endColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 1)} 120%`,
      imgUrl: '/assets/images/simon/snowies-sunset-tezd.jpeg',
    }),
  },
}));

const StyledCard = styled('div')(({ theme }) => ({
  padding: theme.spacing(6, 0),
  paddingTop: '66px',
  ...bgGradient({
    direction: 'to top',
    // startColor: `${alpha(theme.palette.primary[theme.palette.mode === 'light' ? 'main' : 'light'], 0.4)} 0%`,
    // endColor: `${alpha(theme.palette.primary[theme.palette.mode === 'light' ? 'light' : 'lighter'], 0.8)} 70%`,
    // eslint-disable-next-line dot-notation
    startColor: `${alpha(theme.palette.primary['light'], 0.4)} 0%`,
    endColor: `${alpha(theme.palette.primary[theme.palette.mode === 'light' ? 'light' : 'lighter'], 0.8)} 70%`,
  }),
}));

// ----------------------------------------------------------------------

export default function AboutOurMission() {
  const theme = useTheme();
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
          <Typography variant="h1">The Mission</Typography>

          <Typography sx={{ color: 'text.secondary' }}>To empower individuals to take back control, on their journey towards a TRANCEformd and amazing life.</Typography>
        </Stack>

        <Grid container justifyContent="flex-start">
          <Grid xs={12} sm={9} lg={8}>
            <Stack alignItems={{ sm: 'flex-end' }} sx={{ position: 'relative' }}>
              {VISIONS.map((vision, index) => {
                const { name, description } = vision;

                const firstVision = index === 0;

                const secondVision = index === 1;

                const thirdVision = index === 2;

                return (
                  <Card
                    key={name}
                    sx={{
                      p: 3,
                      mt: 2,
                      width: { sm: 'calc(50% - 20px)' },
                      bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.7) : alpha(theme.palette.primary.light, 0.8),

                      // ...(firstVision && {
                      //   top: { md: 0 },
                      //   left: { md: 0 },
                      //   bottom: { md: 0 },
                      //   my: { md: 'auto' },
                      //   boxShadow: { md: 12 },
                      //   maxHeight: { md: 280 },
                      //   display: { md: 'flex' },
                      //   position: { md: 'absolute' },
                      //   flexDirection: { md: 'column' },
                      //   justifyContent: { md: 'center' },
                      // }),
                      ...(firstVision && {
                        top: { sm: 0 },
                        left: { sm: 0 },
                        bottom: { sm: 0 },
                        my: { sm: 'auto' },
                        boxShadow: { sm: 12 },
                        maxHeight: { sm: 230 },
                        display: { sm: 'flex' },
                        position: { sm: 'absolute' },
                        flexDirection: { sm: 'column' },
                        justifyContent: { sm: 'center' },
                      }),
                      ...(secondVision && {
                        boxShadow: { sm: theme.customShadows.z24 },
                      }),
                      ...(thirdVision && {
                        boxShadow: { sm: 8 },
                      }),
                    }}
                  >
                    <Typography variant="h1" component="h2" sx={{ color: 'text.disabled', opacity: 0.8, mb: { sx: 1, md: 3 } }}>
                      {`0${index + 1}`}
                    </Typography>

                    <Typography variant="h4" paragraph sx={{ mb: { xs: 0, md: 1 } }}>
                      {name}
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
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
