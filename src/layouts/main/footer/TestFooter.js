import { Box, Button, Container, Divider, Unstable_Grid2 as Grid, IconButton, InputAdornment, Link, Stack, TextField, Typography, alpha, useTheme } from '@mui/material';
import { _socials } from 'src/_mock';
import Iconify from 'src/components/iconify/Iconify';
import { useSettingsContext } from 'src/components/settings';

const TestFooter = () => {
  // something
  const theme = useTheme();

  return (
    <>
      {/* <Divider /> */}

      <Box
        sx={{
          overflow: 'hidden',
        }}
      >
        <Grid container justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={5.5} sx={{ p: 4, bgcolor: 'background.neutral', display: 'flex', alignItems: 'center' }}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)">
                <Stack spacing={1} alignItems="center">
                  <Link variant="body2" sx={{ color: 'text.primary' }}>
                    Services
                  </Link>
                  <Link variant="body2" sx={{ color: 'text.primary' }}>
                    InSights/Research
                  </Link>
                </Stack>
                <Stack spacing={1} alignItems="center">
                  <Link variant="body2" sx={{ color: 'text.primary' }}>
                    Our Mission
                  </Link>
                  <Link variant="body2" sx={{ color: 'text.primary' }}>
                    Privacy
                  </Link>
                </Stack>
                <Stack spacing={1} alignItems="center">
                  <Link variant="body2" sx={{ color: 'text.primary' }}>
                    About Simon
                  </Link>
                  <Link variant="body2" sx={{ color: 'text.primary' }}>
                    Contact Us
                  </Link>
                </Stack>
              </Box>
              <Stack alignItems="flex-start" spacing={3}>
                <Typography variant="body2" textAlign="center" sx={{ color: 'text.secondary', opacity: 0.8 }}>
                  Simon Baker is a clinical hypnotherapist, mental strength coach, radio host and former racing driver who is giving you the mental edge.{' '}
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* <Grid xs={12} md={6} sx={{ p: 4, backgroundColor: 'primary.main' }}> */}
          <Grid xs={12} md={6.5} sx={{ p: 4, backgroundColor: alpha(theme.palette.primary.main, 0.1) }}>
            <Stack spacing={2}>
              <Stack spacing={1} sx={{ alignItems: 'center' }}>
                <Typography variant="h5">InSights In Your Inbox</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  <br />
                  The newsletter that will inspire you to continue your improvement journey.
                </Typography>
              </Stack>
              <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
                <TextField hiddenLabel required placeholder="First Name" sx={{ minWidth: 160 }} />
                <TextField
                  fullWidth
                  hiddenLabel
                  placeholder="Enter your email"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button size="large" color="primary" variant="contained" sx={{ p: 0, height: 53, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                          <Iconify icon="carbon:send" />
                        </Button>
                      </InputAdornment>
                    ),
                    sx: { pr: 0 },
                  }}
                  // sx={{ maxWidth: 360 }}
                />
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ pt: 4 }}>
              <Typography variant="body2" sx={{ letterSpacing: '3px', mr: 3 }}>
                FIND ME ON
              </Typography>
              {_socials.map((social) => (
                <IconButton key={social.value} color="primary">
                  <Iconify icon={social.icon} />
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {/* <Divider /> */}
      <Container>
        <Stack spacing={2.5} direction="row" justifyContent="space-between" sx={{ py: 2, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Website by TezD
          </Typography>

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © 2023. All rights reserved
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Privacy
            </Link>

            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Terms
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
export default TestFooter;
