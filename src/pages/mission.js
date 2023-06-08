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
        <meta name="Our Mission" content="Our mission at sjb.hypnotherapy is to combine power, passion and commitment to everything we do. Whether it's healing or performance you're after, we're here." />
      </Head>

      <MissionView />
    </>
  );
}
