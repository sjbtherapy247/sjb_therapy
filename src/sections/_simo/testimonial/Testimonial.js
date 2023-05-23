import PropTypes from 'prop-types';
import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Container, Unstable_Grid2 as Grid, alpha } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';
//
import styled from '@emotion/styled';
import { bgGradient } from 'src/utils/cssStyles';
import TestimonialItem from './TestimonialItem';

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(8),
  // paddingBottom: theme.spacing(8),
  ...bgGradient({
    color: alpha(theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800], 0.8),
    imgUrl: '/assets/background/overlay_1.jpg',
  }),
}));

// ----------------------------------------------------------------------

export default function TestimonialCareer({ testimonials }) {
  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');

  const carouselRef = useRef(null);

  const carouselSettings = {
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 250,
    dots: !isMdUp,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    // rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: {
        mt: 8,
      },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <StyledRoot>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid xs={12} md={6}>
            <Typography variant="h2" sx={{ mb: 5, textAlign: 'center' }}>
              What Our Clients Say
            </Typography>

            <Carousel ref={carouselRef} {...carouselSettings}>
              {testimonials.map((testimonial) => (
                <TestimonialItem key={testimonial.id} testimonial={testimonial} />
              ))}
            </Carousel>
          </Grid>
        </Grid>

        {isMdUp && <CarouselArrows spacing={2} justifyContent="center" onNext={handleNext} onPrev={handlePrev} sx={{ mt: 10, width: 1 }} />}
      </Container>
    </StyledRoot>
  );
}

TestimonialCareer.propTypes = {
  testimonials: PropTypes.array,
};
