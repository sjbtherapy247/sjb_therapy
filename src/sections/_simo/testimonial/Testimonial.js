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
  padding: theme.spacing(6, 1),
  // paddingBottom: theme.spacing(8),
  ...bgGradient({
    color: alpha(theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800], 0.8),
    imgUrl: '/assets/background/overlay_1.jpg',
  }),
}));

const reviews = [
  {
    name: 'TRANCEform Hypnotherapy - Clinical Hypnosis Sydney - Simon Baker',
    reviewId: 1,
    reviewer: {
      profilePhotoUrl: 'https://lh3.googleusercontent.com/a/AAcHTtfiIGN8aykkkxsH_IhgtcAfi71WsKv7qedP2yGn=s40-c-c0x00000000-cc-rp-mo-ba2-br100',
      displayName: 'Kylie Essing',
      isAnonymous: false,
    },
    starRating: 5,
    comment: 'Simon listened and understood what I was having trouble with. We discussed ideas on what would help me overcome my anxiety and the use of hypnosis helped me change my thoughts and perceptions for the better. Thanks Simon.',
    createTime: '',
    updateTime: 'update',
    reviewReply: {
      comment: "Thank you Kylie and you're very welcome. It was lovely to meet you and i'm glad we could help with hypnotherapy. SjB",
      updateTime: '',
    },
  },
  {
    name: 'TRANCEform Hypnotherapy - Clinical Hypnosis Sydney - Simon Baker',
    reviewId: 2,
    reviewer: {
      profilePhotoUrl: 'https://lh3.googleusercontent.com/a-/AD_cMMRQlBjzEGyjZbSDfE0YVk23Gqpe2f9BQB3qt_mv=s40-c-c0x00000000-cc-rp-mo-br100',
      displayName: 'Mary Galanis : Mindful Therapies',
      isAnonymous: false,
    },
    starRating: 5,
    comment: 'I needed to sort issues of procrastination.  It was a very good experience. Highly recommend Simon.',
    createTime: '',
    updateTime: 'update',
    reviewReply: {
      comment: "Hi Mary, many thanks for your positive review and I'm so happy to have helped you using hypnotherapy for your procrastination.",
      updateTime: '',
    },
  },
  {
    name: 'TRANCEform Hypnotherapy - Clinical Hypnosis Sydney - Simon Baker',
    reviewId: 3,
    reviewer: {
      profilePhotoUrl: 'https://lh3.googleusercontent.com/a-/AD_cMMRuCRm4mhozmAzRe6cRF8YgOSx2l_zBsblIyi7r=s40-c-c0x00000000-cc-rp-mo-br100',
      displayName: 'Natasha Clarke',
      isAnonymous: false,
    },
    starRating: 5,
    comment: 'Very professional and effective',
    createTime: '',
    updateTime: 'update',
    reviewReply: {
      comment: "Thank you Natasha. It was lovely to meet you and i'm happy that we could help. SjB",
      updateTime: 'replyTime',
    },
  },
  {
    name: 'TRANCEform Hypnotherapy - Clinical Hypnosis Sydney - Simon Baker',
    reviewId: 4,
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
    name: 'TRANCEform Hypnotherapy - Clinical Hypnosis Sydney - Simon Baker',
    reviewId: 5,
    reviewer: {
      profilePhotoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjV-EhUloCIooutrP6BhYZEGvvSWlppa519VBfzaPZSlKpRCKWIo=s36-c-rp-mo-br100',
      displayName: 'Vincent Decomps',
      isAnonymous: false,
    },
    starRating: 5,
    comment: 'Went to see Simon for my life long habit of nail biting. I was open minded about hypnotherapy and after only one session I’ve not bitten my nails since.',
    createTime: '',
    updateTime: 'update',
    reviewReply: {
      comment: "Hi Vincent, thanks for the great review! I'm so happy that you were able to kick the nail biting habit and thanks for being so open minded! Simon",
      updateTime: 'replyTime',
    },
  },
  {
    name: 'TRANCEform Hypnotherapy - Clinical Hypnosis Sydney - Simon Baker',
    reviewId: 6,
    reviewer: {
      profilePhotoUrl: 'https://lh3.googleusercontent.com/a-/ALV-UjXAr3vfr6iLOA9auj7xCwP9SCItTDGq4HkPkjEB2gW__66kxUd2=s36-c-rp-mo-ba3-br100',
      displayName: 'Mark Woolford',
      isAnonymous: false,
    },
    starRating: 5,
    comment: 'I recently completed a 4-6 wk TRANCEformd program with Simon from SjB. Although sceptical at first I quickly found that using the power of my subconscious could have a positive affect on both my sports performance and also day to day life. It has really helped me deal with negative thoughts when under pressure in sporting events and even helped with pain relief from injuries. I strongly recommend this program to anyone who wants to improve their sporting performance and also have a greater level of positivity in day to day life.',
    createTime: '',
    updateTime: 'update',
    reviewReply: {
      comment: "WOW! Thank you Mark and it was Awesome to have you go through the TRANCEformd program 🙏 I'm so glad it's helped you on so many levels and also you now know that you CAN be hypnotised and also hypnotise yourself! 👌",
      updateTime: 'replyTime',
    },
  },
  {
    name: 'TRANCEform Hypnotherapy - Clinical Hypnosis Sydney - Simon Baker',
    reviewId: 7,
    reviewer: {
      profilePhotoUrl: 'https://lh3.googleusercontent.com/a/ACg8ocLMjsl5wWA7k4v54na9NYlWKtHdWmFcR3WjDkrgI8SC8B-_qg=s36-c-rp-mo-br100',
      displayName: 'Kay Vee',
      isAnonymous: false,
    },
    starRating: 5,
    comment: 'I would highly recommend Simon to anyone looking for an insightful and professional therapist.',
    createTime: '',
    updateTime: 'update',
    reviewReply: {
      comment: "Thank you Kate, that's very kind of you to say and generous of you to submit a review. It's very much appreciated - Simon.",
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
      {/* <Container> */}
      <Grid container spacing={3} justifyContent="center" sx={{ m: 0 }}>
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
      {/* </Container> */}
    </StyledRoot>
  );
}

Testimonial.propTypes = {
  reviews: PropTypes.array,
};
