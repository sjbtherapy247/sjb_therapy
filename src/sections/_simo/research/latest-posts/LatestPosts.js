import PropTypes from 'prop-types';
import { useRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Stack, Button } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Iconify from 'src/components/iconify';
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';
//
import PostItem from './PostItem';

// ----------------------------------------------------------------------

export default function LatestPosts({ posts }) {
  const theme = useTheme();

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

  const viewAllBtn = (
    <Button component={NextLink} href="/research" color="primary" endIcon={<Iconify icon="carbon:chevron-right" />}>
      View All
    </Button>
  );

  return (
    <Container
      sx={{
        overflow: 'hidden',
        py: { xs: 6, md: 10 },
        px: 1,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent={{ xs: 'center', md: 'space-between' }}>
        <Typography variant="h3">Latest Posts</Typography>

        {isMdUp && viewAllBtn}
      </Stack>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows onNext={handleNext} onPrev={handlePrev} leftButtonProps={{ sx: { left: { xs: 0, sm: -20, md: -20 } } }} rightButtonProps={{ sx: { right: { xs: 0, sm: -20, md: -20 } } }}>
          <Carousel ref={carouselRef} {...carouselSettings}>
            {posts.map((post) => (
              <Box
                key={post.id}
                sx={{
                  px: 1,
                  py: { xs: 8, md: 10 },
                }}
              >
                <PostItem post={post} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>

      {!isMdUp && (
        <Stack alignItems="center" sx={{ mt: 8 }}>
          {viewAllBtn}
        </Stack>
      )}
    </Container>
  );
}

LatestPosts.propTypes = {
  posts: PropTypes.array,
};
