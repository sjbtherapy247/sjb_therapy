// next
import NextLink from 'next/link';
import Image from 'next/image';
// @mui
import { styled, alpha, useTheme, Stack, Container, Typography, Grid, Button, Link } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  position: 'relative',
  overflow: 'hidden',
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
    backgroundPosition: 'center, left',
    backgroundSize: 'cover, auto 100%',
  },
}));

const StyledImage = styled(Image)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  objectFit: 'cover',
}));

export default function HomeGuidedMediation() {
  const theme = useTheme();

  return (
    <StyledRoot>
      <StyledImage src="/assets/images/simon/guided-med.jpg" alt="Guided Meditation" layout="fill" />
      <Container>
        <Grid container spacing={3} justifyContent="flex-end">
          <Grid xs={12} md={6}>
            <Stack spacing={1} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography color={theme.palette.mode === 'dark' ? 'primary.main' : 'primary.darker'} variant="h2">
                What Is Clinical Hypnotherapy?
              </Typography>
              <Typography variant="h4">It&apos;s how we train the subconscious mind FAST!</Typography>
              <Typography color={theme.palette.grey[theme.palette.mode === 'light' ? 800 : 400]}>
                So, why hypnosis Simon? Well, firstly it helps people address a wide range of mental, emotional, and physical issues by allowing you to fully relax and focus on the goals that matter most to you.
                <br />
                <br />
                I don&apos;t know of a faster, easier, non-pharmacological way to treat such a wide range of conditions. That&apos;s why I became a hypnotherapist. I live my life in the front row and I want everyone to get back to their own front row. <br />I call it <strong>`To TRANCEform` 🤖</strong> That&apos;t why I do it and that&apos;s why I love it 💛
                <br />
                <br />
                By guiding you into a deeply relaxed state, I, <strong>Simon The Hypnotherapist</strong>, will help you modify your ingrained behaviors, thought patterns, and emotional responses so that they are either more easily controlled, or replaced with better alternatives.
                <br />
                <br />
                Through this process, new neural pathways are created, allowing you to simply replace old habits with healthier, more positive ones that are aligned with your future goals.
                <br />
                <br />
                The scope of hypnotherapy is broad, including applications for anxiety, phobias, pain management, smoking cessation, performance, improved sleep, and much more.
                <br />
                <br />
                <h4>Some outcomes are: </h4>
                <center>
                  <ul>
                    🧠 You are empowered to reframe limiting beliefs
                  </ul>
                  <ul>✅ You create new positive habits</ul>
                  <ul>🏃‍♀️ You pursue personal TRANCEformation</ul>
                </center>
                There are so many positive outcomes, that cover many areas of ones life. This helps each person move towards the life they want, rather than the life they have.
                <br />
                <br />
                <center>
                  <h3>Book a call and take back control. Because life won&apos;t wait!</h3>
                </center>
              </Typography>
            </Stack>
            <Link component={NextLink} href="/services/#hypnotherapyPackages">
              <center>
                <Button color="primary" size="large" variant="contained" endIcon={<Iconify icon="carbon:launch" />}>
                  BOOK Your Free Discovery Call
                </Button>
              </center>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}