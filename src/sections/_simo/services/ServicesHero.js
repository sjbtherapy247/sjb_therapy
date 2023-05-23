// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Stack,
  // Button,
  Container,
  // InputBase,
  Typography,
  // InputAdornment,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// hooks
// import useResponsive from 'src/hooks/useResponsive';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 90%`,
    imgUrl: '/assets/images/travel/travel_post_04.jpg',
  }),
  padding: theme.spacing(15, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(20, 0),
  },
}));

// const StyledInput = styled((props) => <InputBase fullWidth {...props} />)(({ theme }) => ({
//   ...theme.typography.body1,
//   height: 56,
//   paddingLeft: theme.spacing(1.5),
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: theme.palette.common.white,
// }));

// ----------------------------------------------------------------------

export default function ServicesHero() {
  return (
    <StyledRoot>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid xs={12} md={10}>
            <Stack
              spacing={3}
              sx={{
                mb: 5,
                mx: 'auto',
                // maxWidth: 480,
                textAlign: 'center',
                color: 'common.white',
              }}
            >
              <Typography variant="h1">Our Services</Typography>

              <Typography sx={{ opacity: 0.72 }}>
                At SJB Therapy, we offer a wide range of services to address various mental and
                emotional concerns. These therapies can help with issues such as anxiety, phobias,
                stress management, self-esteem, weight management, smoking cessation, sleep
                disorders, trauma, relationship difficulties, and personal growth. Whether you seek
                relief from specific fears, want to improve your well-being, or desire to overcome
                past traumas, hypnotherapy and psychotherapy provide effective interventions
                tailored to your individual needs.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------
