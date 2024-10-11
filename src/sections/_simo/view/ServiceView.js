import { useState, useEffect } from 'react'; 
import NextLink from 'next/link';
// @mui
import { Stack, Avatar, Divider, Popover, MenuItem, Container, Typography, IconButton, Unstable_Grid2 as Grid, Box, alpha, useTheme, Link, Button } from '@mui/material';
// seo
import { NextSeo } from 'next-seo'; // Ensure this is imported
// components
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { _socialsServices } from 'src/_mock'; // Import social links for services
import { bgGradient } from 'src/utils/cssStyles';

// ----------------------------------------------------------------------

export default function ServiceView({ service }) {
  const { insights, buttonLink, buttonTitle, url, title, description, heroImg, content } = service;

  const [open, setOpen] = useState(null);
  const theme = useTheme();

  // Dynamically generate social sharing links for the current service
  const socialLinks = _socialsServices(title, url, description, heroImg);

  const handleOpen = (event) => setOpen(event.currentTarget);
  const handleClose = () => setOpen(null);

  // JSON-LD schema for the current service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": description,
    "image": `https://sjbtherapy.com${heroImg}`,
    "url": `https://sjbtherapy.com/services/${url}`,
    "provider": {
      "@type": "Organization",
      "name": "SJB Therapy",
      "url": "https://sjbtherapy.com",
    },
    "areaServed": {
      "@type": "Place",
      "name": "Global",
    },
  };

  return (
    <>
      {/* SEO and JSON-LD */}
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          url: `https://sjbtherapy.com/services/${url}`,
          title,
          description,
          images: [
            {
              url: `https://sjbtherapy.com${heroImg}`,
              width: 800,
              height: 600,
              alt: title,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: service.keywords,
          },
        ]}
        // Dynamically inject JSON-LD schema
        jsonLd={{
          type: 'application/ld+json',
          innerHTML: JSON.stringify(jsonLd),
        }}
      />

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
                textAlign: {
                  xs: 'center',
                  md: 'center',
                },
              }}
            >
              <Typography variant="h2" component="h1" sx={{ mt: 0 }}>
                {title}
                {title.includes('TRANCE') && <sup style={{ fontSize: '20px' }}>TM</sup>}
              </Typography>

              <Stack direction="row">
                {socialLinks.map((social) => (
                  <Link key={social.value} href={social.href} target="_blank" underline="none">
                    <IconButton color="primary">
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
              <Typography variant="h5" component="h2">{description}</Typography>
            </Stack>
            <Divider sx={{ mb: 4 }} />

            <Markdown content={content} />

            <Divider>
              <Link component={NextLink} href="/services#hypnotherapyPackages">
                <center><Button variant="contained" size="large" sx={{ mb: 4 }} endIcon={<Iconify icon="carbon:launch" />}>
                    Book Now
                  </Button></center>
              </Link>
            </Divider>

            <center><Typography>{insights}</Typography></center>

            <center><Link component={NextLink} href={buttonLink}>
              <Button variant="outlined" size="large" sx={{ mt: 2 }} endIcon={<Iconify icon="carbon:launch" />}>
                {buttonTitle}
              </Button>
            </Link></center>

            <Stack direction="row" alignItems="center" sx={{ my: 3 }}>
              <Typography variant="subtitle2" sx={{ mr: 1.5 }}>
                Share:
              </Typography>
              {socialLinks.map((social) => (
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
        open={!!open}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          sx: { width: 200, p: 1 },
        }}
      >
        {socialLinks.map((social) => (
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
