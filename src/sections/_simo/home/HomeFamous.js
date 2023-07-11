import PropTypes from 'prop-types';
import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Card, CardContent, CardHeader, Unstable_Grid2 as Grid, Typography } from '@mui/material';
// components
import Image from 'src/components/image';
import Carousel, { CarouselDots, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function HomeFamous() {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const data = [
    {
      title:
        'The American singer and former member of the Black Eyed Peas, whose real name is Stacy Ferguson, has publicly shared her use of hypnotherapy to overcome her addiction to crystal meth. She has credited hypnotherapy as an important part of her recovery process.	',
      image: '/assets/images/simon/Fergie.png',
      name: 'Fergie',
      description: 'Beat Drug Addiction',
    },
    {
      title:
        'The English actor, known for his roles in "Pirates of the Caribbean" and "Lord of the Rings" franchises, has reportedly used hypnotherapy to overcome a fear of flying. He has spoken about how hypnotherapy helped him deal with his anxiety and conquer his fear of flying.	',
      image: '/assets/images/simon/Orlando-Bloom.jpeg',
      name: 'Orlando Bloom',
      description: 'Fear Of Flying',
    },
    {
      title: 'The renowned Hollywood actor has been open about his positive experience with hypnotherapy to quit smoking. He has credited hypnotherapy as a helpful tool in overcoming his addiction to cigarettes. ',
      image: '/assets/images/simon/Matt-Damon.jpeg',
      name: 'Matt Damon',
      description: 'Quit Smoking',
    },
  ];

  const carouselSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      rounded: true,
      sx: {
        left: 0,
        right: 0,
        zIndex: 10,
        bottom: 10,
        mx: 'auto',
        position: 'absolute',
      },
    }),
  };

  // const handlePrev = () => {
  //   carouselRef.current?.slickPrev();
  // };

  // const handleNext = () => {
  //   carouselRef.current?.slickNext();
  // };

  return (
    <Box sx={{ py: 8, bgcolor: theme.mode === 'light' ? 'secondary.lighter' : 'background.default' }}>
      <Grid container columnSpacing={3} alignItems="center" sx={{ m: 0, px: 0 }}>
        <Grid xs={12} md={4} pb={5}>
          <Typography variant="h3" color="primary.dark" align="center" fontWeight="600">
            Famous <br />
            Hypnotherapy <br />
            Advocates
          </Typography>
        </Grid>
        <Grid xs={12} md={7}>
          <Box
            sx={{
              position: 'relative',
              '& .slick-list': {
                // borderRadius: 2,
                boxShadow: theme.customShadows.z16,
              },
            }}
          >
            {/* <CarouselArrows filled onNext={handleNext} onPrev={handlePrev}> */}
            <Carousel ref={carouselRef} {...carouselSettings}>
              {data.map((item) => (
                <CarouselItem key={item.name} item={item} />
              ))}
            </Carousel>
            {/* </CarouselArrows> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

HomeFamous.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item }) {
  const { image, title, name, description } = item;

  return (
    <Card
      sx={{
        pt: 4,
        pb: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: { xs: '480px', md: '380px' },
      }}
    >
      <CardHeader title={title} sx={{ fontStyle: 'italic', textAlign: 'center' }} titleTypographyProps={{ fontWeight: '200' }} />
      <CardHeader
        avatar={
          <Avatar sx={{ mr: 2, height: '70px', width: '70px' }} variant="rounded" src={image}>
            A
          </Avatar>
        }
        title={name}
        subheader={description}
      />
      {/* <Image alt={title} src={image} sx={{ height: '350px' }} /> */}
      {/* <Typography>{item.title}</Typography> */}
    </Card>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};
