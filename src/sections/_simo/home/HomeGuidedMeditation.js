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
              <Typography color={theme.palette.mode === 'dark' ? 'primary.main' : 'primary.darker'} variant="h1">
                What Is Hypnotherapy?
              </Typography>
              <Typography variant="h4">It&apos;s Like A Guided Meditation</Typography>
              <Typography color={theme.palette.grey[theme.palette.mode === 'light' ? 800 : 400]}>
                <br />
                Hypnotherapy or hypnosis, is used to bring you into a relaxed state where we work on the goals most important to you.
                <br />
                <br /> Your subconscious mind is the one that runs the programs that trip you up, this is the part of you that the hypnosis will re-train. By creating new neural pathways for your subconscious, you will have a new default setting.
                Forgetting that you ever ran the old pattern. <br />
                <br />
                Once we&apos;ve explored your desired outcome, you&apos;ll be invited to embrace a state of deep relaxation, allowing your mind to soar freely. In this state of liberation, you&apos;ll have the power to choose a new path and embrace
                the transformative outcomes you&apos;ve envisioned. We&apos;ll present you with a range of options, empowering you to make choices that resonate with your aspirations and embark on your journey towards a renewed life. Take control of
                your destiny and embrace the freedom to craft your own extraordinary future.
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
