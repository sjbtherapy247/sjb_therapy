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

const reviews = [
  {
    name: 'SJB Therapy',
    reviewId: 1,
    reviewer: {
      profilePhotoUrl: 'https://lh3.googleusercontent.com/a/AAcHTtfiIGN8aykkkxsH_IhgtcAfi71WsKv7qedP2yGn=s40-c-c0x00000000-cc-rp-mo-ba2-br100',
      displayName: 'Kylie Essing',
      isAnonymous: false,
    },
    starRating: 5,
    comment: 'Simon listened and understood what I was having trouble with. We discussed ideas on what would help me overcome my anxiety and the use of hypnosis helped me change my thoughts and perceptions for the better. Thanks Simon.',
    createTime: '2 weeks ago',
    updateTime: 'update',
    reviewReply: {
      comment: "Thank you Kylie and you're very welcome. It was lovely to meet you and i'm glad we could help with hypnotherapy. SjB",
      updateTime: '4 days ago',
    },
  },
  {
    name: 'SJB Therapy',
    reviewId: 2,
    reviewer: {
      profilePhotoUrl: 'https://lh3.googleusercontent.com/a-/AD_cMMRQlBjzEGyjZbSDfE0YVk23Gqpe2f9BQB3qt_mv=s40-c-c0x00000000-cc-rp-mo-br100',
      displayName: 'Mary Galanis : Mindful Therapies',
      isAnonymous: false,
    },
    starRating: 5,
    comment: 'I needed to sort issues of procrastination.  It was a very good experience. Highly recommend Simon.',
    createTime: '3 weeks ago',
    updateTime: 'update',
    reviewReply: {
      comment: "Hi Mary, many thanks for your positive review and I'm so happy to have helped you using hypnotherapy for your procrastination.",
      updateTime: 'repl3 weeks ago',
    },
  },
  {
    name: 'SJB Therapy',
    reviewId: 3,
    reviewer: {
      profilePhotoUrl: 'https://lh3.googleusercontent.com/a-/AD_cMMRuCRm4mhozmAzRe6cRF8YgOSx2l_zBsblIyi7r=s40-c-c0x00000000-cc-rp-mo-br100',
      displayName: 'Natasha Clarke',
      isAnonymous: false,
    },
    starRating: 5,
    comment: 'Very professional and effective',
    createTime: '2 weeks ago',
    updateTime: 'update',
    reviewReply: {
      comment: "Thank you Natasha. It was lovely to meet you and i'm happy that we could help. SjB",
      updateTime: 'replyTime',
    },
  },
];

// ----------------------------------------------------------------------

export default function Testimonial() {
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
        mt: 4,
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
          <Grid xs={12} md={8}>
            <Typography variant="h2" sx={{ mb: 5, textAlign: 'center' }}>
              What Our Clients Say
            </Typography>

            <Carousel ref={carouselRef} {...carouselSettings}>
              {reviews.map((review) => (
                <TestimonialItem key={review.reviewId} review={review} />
              ))}
            </Carousel>
          </Grid>
        </Grid>

        {isMdUp && <CarouselArrows spacing={2} justifyContent="center" onNext={handleNext} onPrev={handlePrev} sx={{ mt: 4, width: 1 }} />}
      </Container>
    </StyledRoot>
  );
}

Testimonial.propTypes = {
  reviews: PropTypes.array,
};
