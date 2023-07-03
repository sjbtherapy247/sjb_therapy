// next
import Head from 'next/head';
// stripe
import Stripe from 'stripe';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { ServicesView } from 'src/sections/_simo/view';

import { servicesDescription } from 'src/sections/_simo/services/svcs';
import { sessionPricing } from 'src/sections/_simo/pricing/pricing';
import { useEffect, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

const svcs = [
  {
    id: 'price_1NJqm8Eu94tSBGzWieZNBnw2',
    object: 'price',
    active: true,
    billing_scheme: 'per_unit',
    created: 1686976212,
    currency: 'aud',
    custom_unit_amount: null,
    livemode: false,
    lookup_key: null,
    metadata: {},
    nickname: null,
    product: {
      id: 'prod_O62rJ5zo1vmx6W',
      object: 'product',
      active: true,
      attributes: [],
      created: 1686976212,
      default_price: 'price_1NJqm8Eu94tSBGzWUAF0bXUt',
      description: 'Single Hypnotherapy Session',
      images: [],
      livemode: false,
      metadata: {},
      name: 'Single Session',
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: 'txcd_20030000',
      type: 'service',
      unit_label: null,
      updated: 1686976650,
      url: null,
    },
    recurring: null,
    tax_behavior: 'inclusive',
    tiers_mode: null,
    transform_quantity: null,
    type: 'one_time',
    unit_amount: 17500,
    unit_amount_decimal: '17500',
  },
  {
    id: 'price_1NJqm8Eu94tSBGzWUAF0bXUt',
    object: 'price',
    active: true,
    billing_scheme: 'per_unit',
    created: 1686976212,
    currency: 'aud',
    custom_unit_amount: null,
    livemode: false,
    lookup_key: null,
    metadata: {},
    nickname: null,
    product: {
      id: 'prod_O62rJ5zo1vmx6W',
      object: 'product',
      active: true,
      attributes: [],
      created: 1686976212,
      default_price: 'price_1NJqm8Eu94tSBGzWUAF0bXUt',
      description: 'Single Hypnotherapy Session',
      images: [],
      livemode: false,
      metadata: {},
      name: 'Single Session',
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: 'txcd_20030000',
      type: 'service',
      unit_label: null,
      updated: 1686976650,
      url: null,
    },
    recurring: null,
    tax_behavior: 'inclusive',
    tiers_mode: null,
    transform_quantity: null,
    type: 'one_time',
    unit_amount: 24500,
    unit_amount_decimal: '24500',
  },
  {
    id: 'price_1NJqY8Eu94tSBGzW7WmrZwtY',
    object: 'price',
    active: true,
    billing_scheme: 'per_unit',
    created: 1686975344,
    currency: 'aud',
    custom_unit_amount: null,
    livemode: false,
    lookup_key: null,
    metadata: {},
    nickname: null,
    product: {
      id: 'prod_O62d6kjTCa8Wph',
      object: 'product',
      active: true,
      attributes: [],
      created: 1686975344,
      default_price: 'price_1NJqY8Eu94tSBGzW7WmrZwtY',
      description: 'Quit Smoking',
      images: [],
      livemode: false,
      metadata: {},
      name: 'Quit Smoking',
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: 'txcd_20030000',
      type: 'service',
      unit_label: null,
      updated: 1686975344,
      url: null,
    },
    recurring: null,
    tax_behavior: 'inclusive',
    tiers_mode: null,
    transform_quantity: null,
    type: 'one_time',
    unit_amount: 42500,
    unit_amount_decimal: '42500',
  },
  {
    id: 'price_1NJqWyEu94tSBGzW9QcEYNeX',
    object: 'price',
    active: true,
    billing_scheme: 'per_unit',
    created: 1686975272,
    currency: 'aud',
    custom_unit_amount: null,
    livemode: false,
    lookup_key: null,
    metadata: {},
    nickname: null,
    product: {
      id: 'prod_O62cTJJuUlCWRQ',
      object: 'product',
      active: true,
      attributes: [],
      created: 1686975271,
      default_price: 'price_1NJqWyEu94tSBGzW9QcEYNeX',
      description: '4 Session Hypnotherapy Bundle',
      images: [],
      livemode: false,
      metadata: {},
      name: '4-Session Bundle',
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: 'txcd_20030000',
      type: 'service',
      unit_label: null,
      updated: 1686976670,
      url: null,
    },
    recurring: null,
    tax_behavior: 'inclusive',
    tiers_mode: null,
    transform_quantity: null,
    type: 'one_time',
    unit_amount: 64000,
    unit_amount_decimal: '64000',
  },
];
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_Simo_Dev);

export async function getStaticProps() {
  //   const { data: xprices } = await stripe.prices.list({
  //     active: true,
  //     limit: 10,
  //     expand: ['data.product'],
  //   });

  return {
    props: {
      // prices: [...xprices],
      servicesDocs: [...servicesDescription],
      packages: [...sessionPricing],
    },
  };
}
// ----------------------------------------------------------------------

ServicesPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ServicesPage({ servicesDocs, packages }) {
  const [pricelist, setPricelist] = useState(null);

  const getPricelist = async () => {
    const price = await fetch(`/api/stripe/pricelist`, {
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

  const { loading } = useSettingsContext();
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Our Services | SJB Therapy</title>
      </Head>

      <ServicesView services={servicesDocs} packages={packages} prices={pricelist} />
    </>
  );
}
