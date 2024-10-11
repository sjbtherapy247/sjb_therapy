import NextLink from 'next/link';
import { useEffect, useState } from 'react';
// @mui
import { Stack, Avatar, Divider, Popover, Checkbox, MenuItem, Container, Typography, IconButton, Unstable_Grid2 as Grid, Box, alpha, useTheme, Link, Button } from '@mui/material';
// utils
import { fDate } from 'src/utils/formatTime';
// components
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { NextSeo } from 'next-seo';
// mock/socials
import { _socialsInsights } from 'src/_mock';
import { ResearchPosts } from 'src/sections/_simo/insights';
import { PostTags, PostAuthor } from 'src/sections/_simo/insights/components';
import { bgGradient } from 'src/utils/cssStyles';

// ----------------------------------------------------------------------

export default function ArticleView({ post, allPosts }) {
  const { title, description, buttonTitle, buttonLink, services, duration, createdAt, author, favorited, heroImg, tags, content } = post;

  const [favorite, setFavorite] = useState(favorited);
  const [open, setOpen] = useState(null);
  const theme = useTheme();

  // Generate social links for this article
  const socialLinks = _socialsInsights(title, post.url, description, heroImg);

  // Client-side render dates to avoid hydration issues between server and client rendering
  const [clientsideDate, setClientsideDate] = useState('');

  useEffect(() => {
    if (createdAt) {
      setClientsideDate(fDate(createdAt, 'dd/MM/yyyy p'));
    }
  }, [createdAt]);

  const handleOpen = (event) => setOpen(event.currentTarget);
  const handleClose = () => setOpen(null);
  const handleChangeFavorite = (event) => setFavorite(event.target.checked);

  // JSON-LD for the article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": `https://sjbtherapy.com${heroImg}`,
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": "https://sjbtherapy.com",
    },
    "datePublished": createdAt,
    "url": `https://sjbtherapy.com/insights/${post.url}`,
    "publisher": {
      "@type": "Organization",
      "name": "SJB Therapy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sjbtherapy.com/logo.png"
      }
    }
  };

  return (
    <>
      {/* SEO and JSON-LD */}
      <NextSeo
        title={title}
        description={description}
        canonical={`https://sjbtherapy.com/insights/${post.url}`}
        openGraph={{
          url: `https://sjbtherapy.com/insights/${post.url}`,
          title,
          description,
          images: [
            {
              url: heroImg,
              width: 800,
              height: 600,
              alt: title,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: post.keywords,
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
                textAlign: { xs: 'center', md: 'center' },
              }}
            >
              <Typography variant="body3" sx={{ opacity: 0.72, pb: 0 }}>
                {duration}
              </Typography>
              <Typography variant="h2" component="h1" sx={{ mt: 0 }}>
                {title}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.72 }}>
                {clientsideDate || 'Loading...'}
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
        <CustomBreadcrumbs
          sx={{ my: 3 }}
          links={[
            { name: 'Home', href: '/' },
            { name: 'Insights', href: '/insights#insights' },
            { name: title },
          ]}
        />
      </Container>

      <Divider />

      <Container maxWidth={false}>
        <Grid container spacing={3} justifyContent={{ md: 'center' }}>
          <Grid xs={12} md={10}>
            <Stack spacing={3} sx={{ textAlign: 'center', pt: { xs: 4, md: 6 }, pb: 5 }}>
              <Typography variant="h5" component="h2">
                {description}
              </Typography>
            </Stack>

            <Divider />

            <Stack direction="row" spacing={1.5} sx={{ py: 3 }}>
              <Avatar src={author.picture} sx={{ width: 48, height: 48 }} />
              <Stack spacing={0.5} flexGrow={1}>
                <Typography variant="subtitle2">{author.name}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {clientsideDate}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
                  <Iconify icon="carbon:share" />
                </IconButton>
                <Checkbox
                  color="error"
                  checked={favorite}
                  onChange={handleChangeFavorite}
                  icon={<Iconify icon="carbon:favorite" />}
                  checkedIcon={<Iconify icon="carbon:favorite-filled" />}
                />
              </Stack>
            </Stack>

            <Divider sx={{ mb: 4 }} />

            <Markdown content={content} firstLetter />

            <Divider />

            <Link component={NextLink} href="/services#hypnotherapyPackages">
              <center>
                <Button variant="contained" size="large" sx={{ my: 2 }} endIcon={<Iconify icon="carbon:launch" />}>
                  Book Now
                </Button>
              </center>
            </Link>

            <Divider sx={{ my: 2 }} />

            {tags.length && <PostTags tags={tags} />}

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

            <Divider sx={{ mt: 8 }} />

            <PostAuthor author={author} />
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <ResearchPosts posts={allPosts.filter((doc) => doc.title !== title).slice(0, 6)} />

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
              <Iconify icon={social.icon} width={24} sx={{ mr: 1 }} />
              Share via {social.label}
            </MenuItem>
          </Link>
        ))}
      </Popover>
    </>
  );
}
