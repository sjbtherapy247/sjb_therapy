// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { ServicesView } from 'src/sections/_simo/view';
import { servicesDescription } from 'src/sections/_simo/services/updated-svcs';
import { sessionPricing } from 'src/sections/_simo/pricing/pricing';
import { useEffect, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

export async function getStaticProps() {
  return {
    props: {
      servicesDocs: [...servicesDescription],
      packages: [...sessionPricing],
      title: servicesDescription[0].title, // Use the first service's title
      description: servicesDescription[0].description, // Use the first service's description
      canonical: `https://sjbtherapy.com/services/${servicesDescription[0].url}/`, // Use the first service's URL
      keywords: servicesDescription[0].keywords, // Use the first service's keywords
    },
  };
}

// ----------------------------------------------------------------------

ServicesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ServicesPage({ servicesDocs, packages, title, description, canonical, keywords }) {
  const [pricelist, setPricelist] = useState(null);

  const getPricelist = async () => {
    const price = await fetch(`/api/stripe/pricelist/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ api_key: process.env.NEXT_PUBLIC_API_ROUTE_SECRET }),
    }).then((res) => res.json());
    setPricelist(price);
  };

  useEffect(() => {
    //
    console.log('running pricelist');
    getPricelist();
  }, []);

  const { loading, host } = useSettingsContext();
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ServicesView
      services={servicesDocs}
      packages={packages}
      prices={pricelist}
      title={title}
      description={description}
      canonical={canonical}
      keywords={keywords}
    />
  );
}