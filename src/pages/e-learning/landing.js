// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { ElearningLandingView } from 'src/sections/_e-learning/view';

// ----------------------------------------------------------------------

ElearningLandingPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ElearningLandingPage() {
  return (
    <>
      <Head>
        <title>Landing | SJB Therapy</title>
      </Head>

      <ElearningLandingView />
    </>
  );
}
