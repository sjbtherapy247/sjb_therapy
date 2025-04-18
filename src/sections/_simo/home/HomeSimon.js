// @mui
import { styled, alpha } from '@mui/material/styles';
import { Typography, Card, Box, Stack, IconButton, Link } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// _mock
import { _socialsSimo } from 'src/_mock';
// components
import Image from 'next/image';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  opacity: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
}));

// ----------------------------------------------------------------------

export default function HomeSimon() {
  const name = 'Simon Baker';
  const role = 'Clinical Hypnotherapist & Strategic Psychotherapist';
  const photo = '/assets/images/simon/simon-baker-main-sjbtherapy.webp';

  return (
    <Stack alignItems="center">
      <Card sx={{ maxHeight: '500px', maxWidth: '400px', width: '100%' }}>
        <Stack spacing={0.5} sx={{ textAlign: 'center', pt: 2, pb: 1.5 }}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            {role}
          </Typography>
        </Stack>

        <Box sx={{ position: 'relative' }}>
          <Shape />

          <StyledOverlay>
            <Stack direction="row" justifyContent="center" sx={{ width: 1, zIndex: 9, bottom: { xs: 115, md: 100 }, position: 'absolute' }}>
              {_socialsSimo.map((social) => (
                <Link key={social.value} target="_blank" href={social.href}>
                  <IconButton color="primary">
                    <Iconify icon={social.icon} />
                  </IconButton>
                </Link>
              ))}
            </Stack>
          </StyledOverlay>

          <Image src={photo} alt={name} layout="responsive" width={400} height={500} />
        </Box>
      </Card>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Shape() {
  return (
    <Box
      sx={{
        top: 0,
        width: 1,
        height: 8,
        zIndex: 9,
        position: 'absolute',
        color: 'background.paper',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="32" viewBox="0 0 1080 32">
        <path fill="currentColor" d="M1080 32L0 0h1080v32z" />
      </svg>
    </Box>
  );
}