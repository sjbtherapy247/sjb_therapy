// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import ServiceView from 'src/sections/_simo/view/ServiceView';

import { servicesDescription } from 'src/sections/_simo/services/updated-svcs';

export async function getStaticPaths() {
  return {
    paths: servicesDescription.map((doc) => ({
      params: {
        url: doc.url,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const serviceDoc = servicesDescription.filter((doc) => doc.url === context.params.url)[0];

  return {
    props: {
      // researchDocs: [...research],
      serviceDoc,
      services: servicesDescription,
    },
  };
}

// ----------------------------------------------------------------------

ServicePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ServicePage({ serviceDoc, services }) {
  console.log(services);
  return (
    <>
      <Head>
        <title>{serviceDoc.title} | SJB Therapy</title>
      </Head>

      <ServiceView service={serviceDoc} />
    </>
  );
}
