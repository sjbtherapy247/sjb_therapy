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
        url: doc.url.replace(/\/$/, ''), // Ensure no trailing slash
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const serviceDoc = servicesDescription.filter((doc) => doc.url === context.params.url)[0];

  return {
    props: {
      serviceDoc,
      services: servicesDescription,
      title: serviceDoc.title || 'Hypnotherapy Service',
      description: serviceDoc.description,
      keywords: serviceDoc.keywords,
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
        canonical=`https://sjbtherapy.com/hypnotherapy-services/${serviceDoc.url}`,
        openGraph={{
          url: serviceDoc.url,
          title: serviceDoc.title,
          description: serviceDoc.description,
          images: [
            {
              url: `https://sjbtherapy.com${serviceDoc.heroImg}`,
              width: 800,
              height: 600,
              alt: serviceDoc.title,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: serviceDoc.keywords,
          },
        ]}

    </NextSeo>

    <ServiceView service={serviceDoc} />
    </>
  );
}
