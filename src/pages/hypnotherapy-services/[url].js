// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import ServiceView from 'src/sections/_simo/view/ServiceView';

import { servicesDescription } from 'src/sections/_simo/services/updated-svcs';

// import { Metadata } from 'next';
//---------------------------------



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
  return (
    <>
      <Head>
        <meta name="title" content={serviceDoc.title} />
        <meta name="description" content={serviceDoc.description} />
        <meta name="keywords" content={serviceDoc.tags} />
      </Head>

      <ServiceView service={serviceDoc} />
    </>
  );
}
