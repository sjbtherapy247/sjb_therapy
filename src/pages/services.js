// next
import Head from 'next/head';
// stripe
// import Stripe from 'stripe';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { ServicesView } from 'src/sections/_simo/view';

import { servicesDescription } from 'src/sections/_simo/services/svcs';
import { sessionPricing } from 'src/sections/_simo/pricing/pricing';

// export async function getServerSideProps() {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//   const { data: prices } = await stripe.prices.list({
//     active: true,
//     limit: 10,
//     expand: ['data.product'],
//   });
//   return {
//     props: {
//       prices,
//     },
//   };
// }

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

export default function ServicesPage({ servicesDocs, pricing, prices }) {
  console.log(prices);
  return (
    <>
      <Head>
        <title>Our Services | SJB Therapy</title>
      </Head>

      <ServicesView services={servicesDocs} pricing={pricing} />
    </>
  );
}
