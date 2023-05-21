// @mui
import { styled, alpha } from '@mui/material/styles';
import { Stack, Button, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// hooks
// config
import { HEADER } from 'src/config-global';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import HomeSimon from './HomeSimon';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.6),
    imgUrl: '/assets/background/overlay_1.jpg',
  }),
  position: 'relative',
  overflow: 'hidden',
  // [theme.breakpoints.up('md')]: {
  //   height: `calc(100vh - ${HEADER.H_MOBILE}px)`,
  // },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  // const containerRef = useRef(null);

  // const isMdUp = useResponsive('up', 'md');

  // const container = useBoundingClientRect(containerRef);

  // const offsetLeft = container?.left;

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
                <Typography variant="h2">Unlock Your Mind</Typography>
                <Typography variant="h3">Embrace Your Potential</Typography>
              </div>

              <Typography color="text.secondary">
                Cultivating the power of hypnotherapy unlocks the gateway to personal
                transformation, enabling individuals to tap into their inner potential and create
                positive and lasting change in their lives. <br />
                <br />
                At SjB Therapy, our team is fully trained in hypnotherapy, psychotherapy, and
                counseling. Experience comprehensive support tailored to your needs. <br />
                Book your first session below and enjoy a complimentary 15-minute consultation. No
                commitment required – explore our services and make an informed decision.
                {/* <br /> Here at SjB Therapy we are fully trained in healing hypnotherapy,
                psychotherapy and counselling, so whatever you need, we can almost certainly help.
                Hit the button below and book in for your first session.
                <br /> Oh and we give you the first 15 minutes free. <br />
                No matter what is causing your current issue, you can still book in for your first
                consult safe in the knowledge that if you don’t feel it’s for you, there’s no
                commitment. */}
              </Typography>

              <Button
                color="primary"
                size="large"
                variant="contained"
                endIcon={<Iconify icon="carbon:launch" />}
                target="_blank"
                rel="noopener"
                href={paths.figmaPreview}
              >
                Book Your Session
              </Button>
            </Stack>
          </Grid>

          <Grid
            xs={12}
            md={7}
            sx={{ pb: { xs: 4, md: 0 }, display: 'flex', justifyContent: 'center' }}
          >
            {/* <Box ref={containerRef} /> */}
            <HomeSimon />
          </Grid>
        </Grid>
      </Container>

      {/* {isMdUp && (
        <Box
          sx={{
            // maxWidth: 1280,
            position: 'absolute',
            bottom: { md: 100 },
            right: { md: -110 },
            width: { md: `calc(100% - ${offsetLeft}px)` },
          }}
        >
          <Image
            visibleByDefault
            disabledEffect
            alt="home hero"
            src="/assets/images/home/home_hero.png"
          />
          <HomeSimon />
        </Box>
      )} */}
    </StyledRoot>
  );
}
