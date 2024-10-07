// next
// import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import ServiceView from 'src/sections/_simo/view/ServiceView';
import { NextSeo } from 'next-seo';
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
      title: serviceDoc.title || 'Research Article',
      description: serviceDoc?.description || null,
      keywords: serviceDoc?.keywords || null,
      canonical: `https://sjbtherapy.com/hypnotherapy-services/${serviceDoc.url}`,
      image: `https://sjbtherapy.com${serviceDoc.heroImg}`,
    },
  };
}

// ----------------------------------------------------------------------

ServicePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ServicePage({ serviceDoc, services }) {
  return (
    <>
    <NextSeo>
    title={serviceDoc.title}
        description={serviceDoc.description}
        canonical={serviceDoc.canonical}
        openGraph={{
          url: serviceDoc.canonical,
          title: serviceDoc.title,
          description: serviceDoc.description,
          images: [
            {
              url: serviceDoc.image,
              width: 800,
              height: 600,
              alt: serviceDoc.title,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: serviceDoc.tags,
          },
        ]}

    </NextSeo>

    <ServiceView service={serviceDoc} />
    </>
  );
}
