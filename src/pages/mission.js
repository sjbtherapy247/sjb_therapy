// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { MissionView } from 'src/sections/_simo/view';

// ----------------------------------------------------------------------

MarketingServicesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MarketingServicesPage() {
  return (
    <>
      <Head>
        <title>Our Mission | SJB Therapy</title>
      </Head>

      <MissionView />
    </>
  );
}
