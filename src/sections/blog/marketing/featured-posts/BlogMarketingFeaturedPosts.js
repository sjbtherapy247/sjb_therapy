import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import Image from 'src/components/image';
import Carousel, { CarouselDots, CarouselArrows } from 'src/components/carousel';
//
import PostItem from 'src/sections/blog/marketing/featured-posts/PostItem';
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
    startColor: `${alpha(theme.palette.common.black, theme.palette.mode === 'light' ? 0 : 0.5)} 0%`,
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

export default function BlogMarketingFeaturedPosts({ posts }) {
  const theme = useTheme();

  const [selected, setSelected] = useState(0);

  const carouselRef = useRef(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setSelected(next),
    ...CarouselDots({
      rounded: true,
      sx: { mt: 2 },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  const isMdUp = useResponsive('up', 'md');
  console.log(isMdUp);
  return (
    <StyledRoot>
      <Container sx={{ mx: 0, mt: 8, p: 1, position: 'relative', zIndex: 9 }}>
        <Typography sx={{ mb: 1, fontWeight: 500 }} variant="h3">
          Features Posts
        </Typography>
        <CarouselArrows
          onNext={handleNext}
          onPrev={handlePrev}
          leftButtonProps={{
            sx: {
              mt: -8,
              left: 2,
              opacity: 1,
              display: isMdUp ? 'inline-flex' : 'none',
              color: 'common.white',
              bgcolor: 'primary.lighter',
              '&:hover': { bgcolor: 'primary.main' },
            },
          }}
          rightButtonProps={{
            sx: {
              mt: -8,
              right: 2,
              opacity: 1,
              display: isMdUp ? 'inline-flex' : 'none',

              color: 'common.white',
              bgcolor: 'primary.lighter',
              '&:hover': { bgcolor: 'primary.main' },
            },
          }}
        >
          <Carousel ref={carouselRef} {...carouselSettings}>
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </Carousel>
        </CarouselArrows>
      </Container>

      {posts.map(
        (post, index) =>
          selected === index && (
            <Image
              key={post.id}
              alt="post cover"
              src={post.coverImg}
              sx={{ position: 'absolute', top: 0, width: 1, height: 1 }}
            />
          )
      )}

      <StyledOverlay />
    </StyledRoot>
  );
}

BlogMarketingFeaturedPosts.propTypes = {
  posts: PropTypes.array,
};
