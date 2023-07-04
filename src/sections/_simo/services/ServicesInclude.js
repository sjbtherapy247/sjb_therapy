// next
import NextLink from 'next/link';
// @mui
import { Typography, Container, Box, Link } from '@mui/material';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// div to reset navigation above the elements  -  looks much better
export default function ServicesInclude({ services }) {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <div id="hypnotherapyServices" style={{ position: 'absolute', top: '-60px' }} />
      </div>

      <Container
        sx={{
          textAlign: 'center',
          pt: { xs: 5, md: 6 },
          pb: { xs: 10, md: 15 },
          // id:"hypnotherapyServices"   looks shit
        }}
      >
        <Typography sx={{ pb: 6 }} variant="h2">
          Hypnotherapy Services
        </Typography>

        {/* <Typography sx={{ mt: 3, mx: 'auto', maxWidth: 480, color: 'text.secondary', mb: { xs: 8, md: 10 } }}>Nunc nonummy metus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis.</Typography> */}

        <Box
          sx={{
            rowGap: 8,
            columnGap: 10,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {services.map((service) => (
            <div key={service.title}>
              <SvgColor src={service.icon} color="info" sx={{ width: 64, height: 64, mx: 'auto', bgcolor: 'primary.main' }} />
              <Link component={NextLink} href={`/hypnotherapy-services/${service.url}`}>
                <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                  {service.title}
                  {service.title.includes('TRANCE') && <sup style={{ fontSize: '10px' }}>TM</sup>}
                </Typography>
              </Link>

              <Typography sx={{ color: 'text.disabled' }}> {service.description} </Typography>
            </div>
          ))}
        </Box>
      </Container>
    </>
  );
}
