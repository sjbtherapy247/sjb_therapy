// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import BlogView from 'src/sections/_simo/view/ResearchView';

// ----------------------------------------------------------------------

BlogPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Research | SJB Therapy</title>
      </Head>

      <BlogView />
    </>
  );
}
