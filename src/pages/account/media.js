// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { AccountMediaView } from 'src/sections/_simo/view';

// ----------------------------------------------------------------------

AccountMediaPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountMediaPage() {
  return (
    <>
      <Head>
        <title>Account: Media | SJB Therapy</title>
      </Head>

      <AccountMediaView />
    </>
  );
}
