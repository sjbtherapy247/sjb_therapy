// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import PostView from 'src/sections/_simo/view/PostView';

// ----------------------------------------------------------------------

MarketingPostPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MarketingPostPage() {
  return (
    <>
      <Head>
        <title>The A-Z Of Event Post | SJB Therapy</title>
      </Head>

      <PostView />
    </>
  );
}
