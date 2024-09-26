// next
import NextLink from 'next/link';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Stack, Container, Typography, Unstable_Grid2 as Grid, Button, Link } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import { useTheme } from '@emotion/react';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  ...bgGradient({
    startColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 800], 0.7)} 0%`,
    endColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 800], 0.95)} 70%`,
    imgUrl: '/assets/images/simon/guided-med.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    ...bgGradient({
      direction: 'to right',
      startColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 800], 0)} 0%`,
      endColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 800], 1)} 55%`,
      imgUrl: '/assets/images/simon/guided-med.jpg',
    }),
    backgroundPosition: 'center, left ',
    backgroundSize: 'cover, auto 100%',
  },
}));

// ----------------------------------------------------------------------

export default function HomeGuidedMediation() {
  const theme = useTheme();

  return (
    <StyledRoot>
      <Container>
        <Grid container spacing={3} justifyContent="flex-end">
          <Grid xs={12} md={6}>
            <Stack
              spacing={1}
              sx={{
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography color={theme.palette.mode === 'dark' ? 'primary.main' : 'primary.darker'} variant="h2">
                What Is Hypnotherapy?
              </Typography>
              <Typography variant="h4">It&apos;s Like A Guided Meditation</Typography>
              <Typography color={theme.palette.grey[theme.palette.mode === 'light' ? 800 : 400]}>
                It allows you fully relax and focus on the goals that matter most to you. By accessing the subconscious mind, which controls many of your habits and behaviors, hypnosis helps to re-train these patterns. 
                <br />
                <br />
                Through this process, new neural pathways are created, allowing you to replace old habits with healthier, more positive ones.
                <br />
                <br />
                In this relaxed state, you are empowered to make choices aligned with your aspirations, dreams and desires, helping you move towards the life you envision. 
                <br />
                <br/>
                Hypnotherapy offers you a path to take back control, so that you can TRANCEform your future.
                <br />
              </Typography>
            </Stack>
            <Link component={NextLink} href="/insights/hypnotherapy-understanding-the-mind-body-connection/">
              <Button sx={{ mt: 4 }} variant="outlined">
                Read More
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
