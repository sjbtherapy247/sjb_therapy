// @mui
import { Container, Unstable_Grid2 as Grid } from '@mui/material';
// _mock
import { _categories, _tags } from 'src/_mock';
// SEO
import { NextSeo } from 'next-seo';
// sections
import BlogSidebar from 'src/sections/_simo/insights/sidebar';
import { FeaturedPosts, ResearchPosts } from 'src/sections/_simo/insights';
import { PostSearchMobile } from 'src/sections/_simo/insights/components';

// ----------------------------------------------------------------------

export default function ResearchView({ researchDocs }) {
  const pageTitle = "Insights Articles - Simon Baker Hypnotherapy";
  const pageDescription = "Browse insightful Insights articles from Simon on various topics including mental health, therapy, and wellness.";
  
  return (
    <>
      {/* SEO configuration using NextSeo */}
      <NextSeo
        title={researchDocs.pageTitle}
        description={researchDocs.pageDescription}
        canonical="https://sjbtherapy.com/insights"
        openGraph={{
          url: 'https://sjbtherapy.com/insights',
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: 'https://sjbtherapy.com/images/research-banner.jpg', // Placeholder for any banner or featured image
              width: 1200,
              height: 630,
              alt: 'Hypnotherapy Insights - Simon Baker Hypnotherapist',
            },
          ],
        }}
      />

      {/* Search and Featured Posts */}
      <PostSearchMobile />
      <FeaturedPosts posts={researchDocs.slice(0, 3)} />

      {/* Main Content and Sidebar */}
      <Container
        maxWidth={false}
        sx={{
          mt: 5,
          mx: 0,
          px: 1,
        }}
      >
        <Grid container columnSpacing={{ xs: 0, md: 8 }}>
          <Grid xs={12} md={8}>
            <ResearchPosts posts={researchDocs} />
          </Grid>

          <Grid xs={12} md={4}>
            <BlogSidebar
              popularTags={_tags}
              categories={_categories}
              recentPosts={researchDocs.slice(-4)}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
