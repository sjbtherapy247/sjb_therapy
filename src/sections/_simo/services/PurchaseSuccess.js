import NextLink from 'next/link';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Container, Typography, Button, Unstable_Grid2 as Grid, Link } from '@mui/material';
// utils
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import { bgGradient } from 'src/utils/cssStyles';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const StyledBgImage = styled('div')(({ theme }) => ({
  padding: theme.spacing(4, 4),
  ...bgGradient({
    startColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 0.7)} 0%`,
    endColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 0.9)} 70%`,
    imgUrl: '/assets/images/travel/travel_1.jpg',
  }),
  // [theme.breakpoints.up('md')]: {
  //   ...bgGradient({
  //     direction: 'to left',
  //     startColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 0.7)} 0%`,
  //     endColor: `${alpha(theme.palette.grey[theme.palette.mode === 'light' ? 500 : 900], 1)} 100%`,
  //     imgUrl: '/assets/images/travel/travel_1.jpg',
  //   }),
  // },
})); // ----------------------------------------------------------------------

export default function PurchaseSuccess({ checkout }) {
  // const isMdUp = useResponsive('up', 'md');

  useEffect(() => {
    createClient();
  }, []);

  async function createClient() {
    try {
      const user = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUserEmail: checkout.customer_details.email,
          // newUserEmail: data.email,
          mode: 'isClient',
          // test: 'true',
        }),
      }).then((res) => res.json());
      // if the account already exists exit
      if (user.uid) return;

      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUserEmail: checkout.customer_details.email,
          currentUserName: checkout.customer_details.name.split(/[ ]+/)[0], // first name or nickname
          mode: 'signInWithEmail',
        }),
      }).then((res) => res.json());
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StyledBgImage>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid
          xs={12}
          md={12}
          lg={10}
          sx={{
            textAlign: { xs: 'center' },
            // textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2">Thank You</Typography>

          <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
            You have successfully purchased the following..
            <br />
            {checkout.line_items.data[0].description}
            <br />
            <br />
            Your receipt has been emailed to {checkout.customer_details.email}
            <br />
            <br />
            For existing clients,your purchase details and receipt are also available in your SJB Therapy account. For new clients we have also emailed you a link to access your new SJB Therapy account. Follow the instructions in your email to
            complete account setup.
            <br />
            <br />
            We will be in touch shortly to schedule your session.
          </Typography>

          <Box sx={{ mt: 10 }}>
            {/* <m.div variants={varFade({ distance: 300 }).inUp}> */}
            <Typography variant="h3">Simply Just Believe</Typography>
            <Typography sx={{ mt: 1, color: 'text.secondary' }}>in</Typography>
            <Typography sx={{ mt: 1, color: 'text.secondary' }}>Yourself / Progress / Never Giving Up / Hypnotherapy / Possibilities</Typography>
            {/* </m.div> */}
          </Box>
          {/* <Button variant="outlined" color="inherit" size="large" endIcon={<Iconify icon="carbon:chevron-right" />}>
            Check Our Work
          </Button> */}
          {/* <Link component={NextLink} href="/services/#hypnotherapyServices">
            <Button sx={{ mt: 4 }} variant="outlined">
              Our Services
            </Button>
          </Link> */}
        </Grid>
      </Grid>
    </StyledBgImage>
  );
}
