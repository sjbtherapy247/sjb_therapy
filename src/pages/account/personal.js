// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { AccountPersonalView } from 'src/sections/_simo/view';

// ----------------------------------------------------------------------

AccountPersonalPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountPersonalPage() {
  return (
    <>
      <Head>
        <title>Account: Personal | SJB Therapy</title>
      </Head>

      <AccountPersonalView />
    </>
  );
}
