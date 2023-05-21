// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import HomeView from 'src/sections/_home/view';

// ----------------------------------------------------------------------

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

// Entry point to website content

export default function HomePage() {
  return (
    <>
      <Head>
        <title>SJB Therapy - Your next step to a better you!!</title>
      </Head>

      <HomeView />
    </>
  );
}
