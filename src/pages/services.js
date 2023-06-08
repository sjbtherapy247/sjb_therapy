// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { ServicesView } from 'src/sections/_simo/view';

import { servicesDescription } from 'src/sections/_simo/services/svcs';
import { sessionPricing } from 'src/sections/_simo/pricing/pricing';

export async function getStaticProps() {
  console.log(servicesDescription);
  return {
    props: {
      servicesDocs: [...servicesDescription],
      pricing: [...sessionPricing],
    },
  };
}
// ----------------------------------------------------------------------

ServicesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ServicesPage({ servicesDocs, pricing }) {
  return (
    <>
      <Head>
        <title>Our Services | SJB Therapy</title>
      </Head>

      <ServicesView services={servicesDocs} pricing={pricing} />
    </>
  );
}
