// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { CareerPostView } from 'src/sections/_career/view';

// ----------------------------------------------------------------------

CareerPostPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function CareerPostPage() {
  return (
    <>
      <Head>
        <title>The A-Z Of Event Post | SJB Therapy</title>
      </Head>

      <CareerPostView />
    </>
  );
}
