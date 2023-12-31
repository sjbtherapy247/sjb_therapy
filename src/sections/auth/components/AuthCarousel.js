import PropTypes from 'prop-types';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import Image from 'src/components/image';
import Carousel, { CarouselDots } from 'src/components/carousel';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  // display: 'block',
  [theme.breakpoints.up('xs')]: {
    width: 1,
    flexGrow: 1,
    display: 'block',
    position: 'relative',
  },
}));

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
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

AuthCarousel.propTypes = {
  title: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
};

export default function AuthCarousel({ title, images }) {
  const theme = useTheme();

  const carouselSettings = {
    autoplaySpeed: 10000,
    speed: 1000,
    fade: true,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      rounded: true,
      sx: {
        left: 0,
        right: 0,
        zIndex: 10,
        top: 600,
        mx: 'auto',
        position: 'absolute',
      },
    }),
  };

  return (
    <StyledRoot>
      <StyledOverlay />

      <Typography
        variant="h2"
        sx={{
          // m: 0,
          width: 1,
          left: 0,
          bottom: 100,
          zIndex: 9,
          fontWeight: '300',
          textAlign: 'center',
          position: 'absolute',
          color: 'common.white',
          // whiteSpace: 'pre-line',
        }}
      >
        {title}
      </Typography>

      <Carousel {...carouselSettings}>
        {images.map((img) => (
          <Box key={img}>
            <Image alt={img} src={img} sx={{ width: 1, height: '100vh' }} />
          </Box>
        ))}
      </Carousel>
    </StyledRoot>
  );
}
