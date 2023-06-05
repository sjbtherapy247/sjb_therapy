// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import ServiceView from 'src/sections/_simo/view/ServiceView';

import { services } from 'src/sections/_simo/services/services';

export async function getStaticPaths() {
  return {
    paths: services.map((doc) => ({
      params: {
        url: doc.url,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const serviceDoc = services.filter((doc) => doc.url === context.params.url)[0];

  return {
    props: {
      // researchDocs: [...research],
      serviceDoc,
    },
  };
}

// ----------------------------------------------------------------------

ServicesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ServicesPage({ serviceDoc }) {
  return (
    <>
      <Head>
        <title>{serviceDoc.title} | SJB Therapy</title>
      </Head>

      <ServiceView service={serviceDoc} />
    </>
  );
}
