import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Box, Container, Typography, useTheme } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { bgGradient } from 'src/utils/cssStyles';
// components
import { varFade, MotionViewportReAnimate } from 'src/components/animate';
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';

// local
import { useRef } from 'react';
import useResponsive from 'src/hooks/useResponsive';
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

export default function PricingHome({ plans }) {
  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');

  console.log(isMdUp);

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
            <Typography sx={{ color: 'text.secondary' }}>
              In summary.. you can pay on a per session basis or purchase a 3-session bundle. Hypnotherapy is a process, it usually takes three sessions to address the issues effectively, However, the Quit Smoking in 90 minutes therapy follows a
              different approach. For consultation details please check out our Hypnotherapy services page.
            </Typography>
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
                <PlanCard plan={plan} />
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
                  <PlanCard plan={plan} />
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
