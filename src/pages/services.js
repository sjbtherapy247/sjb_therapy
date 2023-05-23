// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { ServicesView } from 'src/sections/_simo/view';

// ----------------------------------------------------------------------

MarketingServicesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MarketingServicesPage() {
  return (
    <>
      <Head>
        <title>Our Services | SJB Therapy</title>
      </Head>

      <ServicesView />
    </>
  );
}
