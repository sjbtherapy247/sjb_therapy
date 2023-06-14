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
        <meta name="Our Mission" content="Our mission is to combine healing and performance to everything we do. Your healing and mental strength is our passion and we will not stop until it's found." />
        <meta name="keywords" content="Our Mission, healing and performance" />
        <meta name="description" content="Our mission is to combine healing and performance to everything we do. Your healing and mental strength is our passion and we will not stop until it's found." />
      </Head>

      <MissionView />
    </>
  );
}
