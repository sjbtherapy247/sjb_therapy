// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import BlogView from 'src/sections/_simo/view/BlogView';

// ----------------------------------------------------------------------

BlogPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog | SJB Therapy</title>
      </Head>

      <BlogView />
    </>
  );
}
