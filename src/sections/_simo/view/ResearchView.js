// @mui
import { Container, Unstable_Grid2 as Grid } from '@mui/material';
// _mock
import _mock, { _blogMarketingPosts, _categories, _tags } from 'src/_mock';
//

// import { PostSearchMobile } from 'src/sections/blog/components';
import BlogSidebar from 'src/sections/_simo/insights/sidebar';
import { FeaturedPosts, ResearchPosts } from 'src/sections/_simo/insights';
import { PostSearchMobile } from 'src/sections/_simo/insights/components';
// import NewsletterMarketing from 'src/sections/newsletter/marketing';

// ----------------------------------------------------------------------

export default function ReasearchView({ researchDocs }) {
  return (
    <>
      <PostSearchMobile />

      <FeaturedPosts posts={researchDocs.slice(0, 3)} />

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
              // recentPosts={{ list: researchDocs.slice(-4) }}
              // advertisement={{
               //  title: 'Advertisement',
                // description: 'Duis leo. Donec orci lectus, aliquam ut, faucibus non',
                // imageUrl: _mock.image.marketing(9),
                // path: '',
             //  }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
