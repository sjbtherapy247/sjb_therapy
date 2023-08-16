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
    startColor: `${alpha(theme.palette.background.default, 0.7)} 40%`,
    endColor: `${theme.palette.background.default} 140%`,
    imgUrl: '/assets/images/travel/travel_post_04.jpg',
  }),
  padding: theme.spacing(15, 0),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(10, 0),
    paddingBottom: theme.spacing(20, 0),
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
                mb: 0,
                mx: 'auto',
                // maxWidth: 480,
                textAlign: 'center',
                // color: 'common.white',
              }}
            >
              <Typography sx={{ pb: 4 }} variant="h1">
                Our Services
              </Typography>

              <Typography color="text.secondary" sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
                Here at SjB Therapy, I offer a wide range of services to address various mental and emotional concerns. These therapies can help with issues such as anxiety, phobias, stress management, self-esteem, weight management, smoking cessation,
                sleep disorders, trauma, relationship difficulties, and personal growth. 
                <p>Whether you seek relief from specific fears, want to improve your well-being, or desire to overcome past traumas, our hypnotherapy and psychotherapy solutions will provide effective interventions that are then tailored to your individual needs.</p>
                <p>If your specific circumstances aren&apos;t listed below, please reach out for your discovery call to discuss.</p>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------
