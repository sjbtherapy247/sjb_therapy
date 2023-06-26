// react
import { useEffect, useRef, useState } from 'react';
// next
import NextLink from 'next/link';
// libs
import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Box, Button, Container, Link, Typography, useTheme, Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { bgGradient } from 'src/utils/cssStyles';
// components
import { varFade, MotionViewportReAnimate } from 'src/components/animate';
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';
// local
import useResponsive from 'src/hooks/useResponsive';
import Iconify from 'src/components/iconify/Iconify';
import { onValue, ref } from 'firebase/database';
import { db } from 'src/lib/createFirebaseApp';
import { useSettingsContext } from 'src/components/settings';
import PlanCard from './PlanCard';

const StyledRoot = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10),
  ...bgGradient({
    color: alpha(theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800], 0.8),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
}));
// ----------------------------------------------------------------------

export default function PricingHome({ plans, prices }) {
  const theme = useTheme();
  const { currentUser } = useSettingsContext();

  const [currentClient, setCurrentClient] = useState(0);

  const purchaseRef = ref(db, 'purchases/');
  useEffect(() => {
    const listener = onValue(purchaseRef, (snapshot) => {
      if (snapshot.val()) {
        const items = Object?.values(snapshot.val());
        console.log(items);

        setCurrentClient([...items.filter((item) => item.data.object?.billing_details?.email === currentUser.email)].length);
      }
    });
    return () => listener();
  }, []);

  const isMdUp = useResponsive('up', 'md');

  const carouselRef = useRef(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots(),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <StyledRoot>
      <div style={{ position: 'relative' }}>
        <div id="hypnotherapyPackages" style={{ position: 'absolute', top: '-100px' }} />
      </div>
      <Container
        component={MotionViewportReAnimate}
        sx={{
          pt: { xs: 1, md: 1 },
          pb: { xs: 5, md: 5 },
        }}
      >
        <Box
          sx={{
            mb: { xs: 4, md: 6 },
            textAlign: 'center',
          }}
        >
          {/* <m.div variants={varFade().inDown}> */}
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            pricing plans
          </Typography>
          {/* </m.div> */}

          {/* <m.div variants={varFade().inDown}> */}
          <Typography variant="h2" sx={{ my: 3 }}>
            Hypnotherapy Packages
            <br />
            And Session Fees
          </Typography>
          {/* </m.div> */}

          <m.div variants={varFade().inUp}>
            <Stack spacing={6} alignItems="center">
              <Typography sx={{ color: 'text.secondary' }}>
                Pay on a per session basis or purchase a 4-session bundle. Hypnotherapy is a process, it usually takes a couple of sessions to address the issues effectively, However, the Quit Smoking follows a different approach and can be done in a
                single 90 minute session. We also offer a free 15 min initial consultation so you can explore if this is right for you.
              </Typography>
              <Link component={NextLink} rel="noopener" href="/">
                <Button color="primary" size="large" variant="contained" endIcon={<Iconify icon="carbon:launch" />}>
                  Book Your Free Session
                </Button>
              </Link>
            </Stack>
          </m.div>
        </Box>

        {isMdUp && (
          <Box
            sx={{
              gap: 3,
              display: 'grid',
              alignItems: 'center',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                md: 'repeat(3, 1fr)',
              },
            }}
          >
            {plans.map((plan) => (
              <m.div key={plan.license} variants={varFade({ distance: 140 }).inDown}>
                <PlanCard plan={plan} prices={prices} currentClient={currentClient} />
              </m.div>
            ))}
          </Box>
        )}
      </Container>
      {!isMdUp && (
        <Box sx={{ position: 'relative', px: 2 }}>
          <CarouselArrows
            onNext={handleNext}
            onPrev={handlePrev}
            leftButtonProps={{ sx: { left: { xs: 0, sm: 10, md: 10 }, color: 'common.white', bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main' } } }}
            rightButtonProps={{ sx: { right: { xs: 0, sm: 10, md: 10 }, color: 'common.white', bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main' } } }}
          >
            <Carousel ref={carouselRef} {...carouselSettings}>
              {plans.map((plan) => (
                <Box key={plan.license} sx={{ position: 'relative', px: 1, py: { xs: 8, md: 10 } }}>
                  {/* <m.div key={plan.license} variants={varFade({ distance: 240 }).inDown}> */}
                  <PlanCard plan={plan} prices={prices} />
                  {/* </m.div> */}
                </Box>
              ))}
            </Carousel>
          </CarouselArrows>
        </Box>
      )}
    </StyledRoot>
  );
}

PricingHome.propTypes = {
  plans: PropTypes.array,
};
