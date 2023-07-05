import { useState } from 'react';
import NextLink from 'next/link';

// @mui
import { Stack, Avatar, Divider, Popover, Checkbox, MenuItem, Container, Typography, IconButton, Unstable_Grid2 as Grid, Box, alpha, useTheme, Link, Button } from '@mui/material';
// routes
// import { paths } from 'src/routes/paths';
// utils
// _mock
// moved one level up
// components
// import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import { _socials } from 'src/_mock';
// import Head from 'next/head';
// import { LatestPosts } from 'src/sections/_simo/insights';
import { PostTags, PostAuthor, PostSocialsShare } from 'src/sections/_simo/insights/components';
import { bgGradient } from 'src/utils/cssStyles';

// ----------------------------------------------------------------------

export default function ServiceView({ service }) {
  const { insights, buttonLink, buttonTitle, url, title, description, heroImg, /* tags, */ content } = service;

  const [open, setOpen] = useState(null);
  const theme = useTheme();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Box
        sx={{
          py: 10,
          position: 'relative',
          ...bgGradient({
            startColor: `${alpha(theme.palette.background.default, 0.4)} 0%`,
            endColor: `${theme.palette.background.default} 100%`,
            imgUrl: heroImg,
          }),
        }}
      >
        <Grid container spacing={3} sx={{ m: 0, justifyContent: 'center' }}>
          <Grid xs={12} md={8}>
            <Stack
              spacing={2}
              alignItems={{
                xs: 'center',
                md: 'center',
              }}
              sx={{
                // color: 'common.white',
                textAlign: {
                  xs: 'center',
                  md: 'center',
                },
              }}
            >
              <Typography variant="h1" component="h1" sx={{ mt: 0 }}>
                {title}
                {title.includes('TRANCE') && <sup style={{ fontSize: '20px' }}>TM</sup>}
              </Typography>

              <Stack direction="row">
                {_socials.map((social) => (
                  <Link key={social.value} href={social.href} target="_blank" underline="none">
                    <IconButton color="primary" /* sx={{ color: social.color }} */>
                      <Iconify icon={social.icon} />
                    </IconButton>
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Container>
        <Stack direction="row" alignItems="center">
          <CustomBreadcrumbs sx={{ my: 3, flexGrow: 1 }} links={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/services#hypnotherapyServices' }, { name: title }]} />
          <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
            <Iconify icon="carbon:share" />
          </IconButton>
        </Stack>
      </Container>

      <Divider />

      <Container maxWidth={false}>
        <Grid container spacing={3} justifyContent={{ md: 'center' }}>
          <Grid xs={12} md={10}>
            <Stack
              spacing={3}
              sx={{
                textAlign: 'center',
                pt: { xs: 4, md: 6 },
                pb: 5,
              }}
            >
              <Typography variant="h5">{description}</Typography>
            </Stack>
            <Divider sx={{ mb: 4 }} />
            <Markdown content={content} />
            {/* {tags.length && <PostTags tags={tags} />} */}
            <Link component={NextLink} href="/services#hypnotherapyPackages">
              <Button variant="contained" sx={{ mb: 3 }} endIcon={<Iconify icon="carbon:launch" />}>
                Book Now
              </Button>
            </Link>
            <Typography>{insights}</Typography>
            <Link component={NextLink} href={buttonLink}>
              <Button variant="outlined" size="large" sx={{ mt: 2 }} endIcon={<Iconify icon="carbon:launch" />}>
                {buttonTitle}
              </Button>
            </Link>
            {/* <PostSocialsShare /> */}
            <Stack direction="row" alignItems="center" sx={{ my: 3 }}>
              <Typography variant="subtitle2" sx={{ mr: 1.5 }}>
                Share:
              </Typography>
              {_socials.map((social) => (
                <Link key={social.value} href={social.href} target="_blank" underline="none">
                  <IconButton sx={{ color: social.color }}>
                    <Iconify icon={social.icon} />
                  </IconButton>
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Popover
        open={!!open} /* open is e.currenttarget so force it to boolean */
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          sx: { width: 200, p: 1 },
        }}
      >
        {_socials.map((social) => (
          <Link key={social.value} href={social.href} target="_blank" underline="none">
            <MenuItem onClick={handleClose} sx={{ typography: 'body2', color: theme.palette.primary.main }}>
              <Iconify icon={social.icon} width={24} sx={{ mr: 1, color: social.color }} />
              Share via {social.label}
            </MenuItem>
          </Link>
        ))}
      </Popover>
    </>
  );
}
