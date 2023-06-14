import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import Image from 'src/components/image';
import Carousel, { CarouselDots, CarouselArrows } from 'src/components/carousel';
//
import PostItem from 'src/sections/_simo/insights/featured-posts/PostItem';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(0, 0),
  '& .slick-list': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1, 0, 5, 0),
  },
}));

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, theme.palette.mode === 'light' ? 0 : 0.6)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

export default function FeaturedPosts({ posts }) {
  const theme = useTheme();

  const [selected, setSelected] = useState(0);

  const carouselRef = useRef(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    // fade: true,
    // adaptiveHeight: true,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setSelected(next),
    ...CarouselDots({
      rounded: true,
      sx: { pt: 4 },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  const isMdUp = useResponsive('up', 'md');
  return (
    <StyledRoot>
      <Box
        sx={{
          maxWidth: '2400px',
          mx: 0,
          py: { xs: 10, md: 12 },
          px: { xs: 1, sm: 2, md: 4 },
          position: 'relative',
          zIndex: 9,
        }}
      >
        <Typography sx={{ mb: 3, fontWeight: 600 }} variant="h2">
          Featured InSights{' '}
        </Typography>
        <CarouselArrows
          onNext={handleNext}
          onPrev={handlePrev}
          leftButtonProps={{
            sx: {
              // mt: -8,
              left: 30,
              opacity: 0.8,
              display: isMdUp ? 'inline-flex' : 'none',
              color: 'common.white',
              bgcolor: 'primary.lighter',
              '&:hover': { bgcolor: 'primary.main' },
            },
          }}
          rightButtonProps={{
            sx: {
              // mt: -8,

              right: 30,
              opacity: 0.8,
              display: isMdUp ? 'inline-flex' : 'none',

              color: 'common.white',
              bgcolor: 'primary.lighter',
              '&:hover': { bgcolor: 'primary.main' },
            },
          }}
        >
          <Carousel ref={carouselRef} {...carouselSettings}>
            {posts.map((post) => (
              <PostItem key={post.url} post={post} />
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>
      {/* background image */}
      {posts.map((post, index) => selected === index && <Image key={post.id} alt="post cover" src={post.coverImg} sx={{ position: 'absolute', top: 0, width: 1, height: 1 }} />)}

      <StyledOverlay />
    </StyledRoot>
  );
}

FeaturedPosts.propTypes = {
  posts: PropTypes.array,
};
