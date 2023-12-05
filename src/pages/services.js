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
      title: 'Hypnotherapy Services Sydney - SJB Therapy',
      description: 'Our range of hypnotherapy services cover fears, phobias and anxieties, up to sporting and performance hypnosis. We cover Sydney locally and online globally',
      canonical: 'https://sjbtherapy.com/services/',
      keywords: 'hypnotherapy and hypnosis services sydney',
    },
  };
}

// ----------------------------------------------------------------------

ServicesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ServicesPage({ servicesDocs, packages }) {
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

  return <ServicesView services={servicesDocs} packages={packages} prices={pricelist} />;
}
