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
        <title>Simply Just Believe | SJB Therapy</title>
        <meta name="SjB Therapy" content="SjB Therapy - Our Hypnotherapy Mission - Simply just Believe" />
      </Head>

      <MissionView />
    </>
  );
}
