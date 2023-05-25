// @mui
import { Container, Unstable_Grid2 as Grid } from '@mui/material';
// _mock
import _mock, { _blogMarketingPosts, _categories, _tags } from 'src/_mock';
//

// import { PostSearchMobile } from 'src/sections/blog/components';
import BlogSidebar from 'src/sections/blog/sidebar';
import { BlogMarketingFeaturedPosts, BlogMarketingPosts } from 'src/sections/_simo/research';
// import NewsletterMarketing from 'src/sections/newsletter/marketing';

// ----------------------------------------------------------------------

export default function ReasearchView() {
  console.log(_blogMarketingPosts);
  return (
    <>
      {/* <PostSearchMobile /> */}

      <BlogMarketingFeaturedPosts posts={_blogMarketingPosts.slice(0, 5)} />

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
            <BlogMarketingPosts posts={_blogMarketingPosts} />
          </Grid>

          <Grid xs={12} md={4}>
            <BlogSidebar
              author={{ name: 'Tezza D', role: 'Developer' }}
              popularTags={_tags}
              categories={_categories}
              recentPosts={{ list: _blogMarketingPosts.slice(-6) }}
              advertisement={{
                title: 'Advertisement',
                description: 'Duis leo. Donec orci lectus, aliquam ut, faucibus non',
                imageUrl: _mock.image.marketing(9),
                path: '',
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* <NewsletterMarketing /> */}
    </>
  );
}
