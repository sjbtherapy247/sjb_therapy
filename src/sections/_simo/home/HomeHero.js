// @mui
import { styled, alpha } from '@mui/material/styles';
import { Stack, Button, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import HomeSimon from './HomeSimon';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.85),
    imgUrl: '/assets/images/simon/20230513_145715.jpg',
    // imgUrl: '/assets/background/overlay_2.jpg',
  }),
  position: 'relative',
  overflow: 'hidden',
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <StyledRoot>
      <Container sx={{ p: 0, height: 1 }}>
        <Grid container columnSpacing={3} alignItems="center" sx={{ height: 1 }}>
          <Grid xs={12} md={5}>
            <Stack
              spacing={4}
              justifyContent="center"
              alignItems={{ xs: 'center', md: 'flex-start' }}
              sx={{
                py: { xs: 10, md: 12 },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <div>
                <Typography variant="h3">Simply Just Believe</Typography>
                <Typography variant="h5">SJB Therapy</Typography>
              </div>
              <div>
                <Typography variant="h2">Unlock Your Mind</Typography>
                <Typography variant="h4">Embrace Your Potential</Typography>
              </div>

              <Typography color="text.secondary">
                Hi, I&apos;m Simon, welcome to sjb.hypnotherapy. I&apos;m glad you&apos;ve found your way here because I suspect that you’re either facing a challenge or seeking to unlock your true potential. Whatever it is, know that you&apos;re in
                the right place. Please book your free 15-minute consultation so we can explore the best path forward together. <br />
                <br />
                Remember, you don&apos;t have to face your challenges alone. Together, we can discover the solutions and strategies that will empower you to overcome obstacles and unlock your full potential. Let your tomorrow begin today!
                {/* <br /> Here at SjB Therapy we are fully trained in healing hypnotherapy,
                psychotherapy and counselling, so whatever you need, we can almost certainly help.
                Hit the button below and book in for your first session.
                <br /> Oh and we give you the first 15 minutes free. <br />
                No matter what is causing your current issue, you can still book in for your first
                consult safe in the knowledge that if you don’t feel it’s for you, there’s no
                commitment. */}
              </Typography>

              <Button color="primary" size="large" variant="contained" endIcon={<Iconify icon="carbon:launch" />} target="_blank" rel="noopener" href={paths.figmaPreview}>
                Book Your Free Session
              </Button>
            </Stack>
          </Grid>

          <Grid xs={12} md={7} sx={{ pb: { xs: 4, md: 0 }, display: 'flex', justifyContent: 'center' }}>
            <HomeSimon />
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
