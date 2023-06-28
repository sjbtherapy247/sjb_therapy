// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { EcommerceCheckoutView } from 'src/sections/_e-commerce/view';

// ----------------------------------------------------------------------

EcommerceCheckoutPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function EcommerceCheckoutPage() {
  return (
    <>
      <Head>
        <title>Checkout | SJB Therapy</title>
      </Head>

      <EcommerceCheckoutView />
    </>
  );
}
