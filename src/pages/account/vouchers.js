// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { AccountVouchersView } from 'src/sections/_simo/view';

// ----------------------------------------------------------------------

AccountVouchersPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountVouchersPage() {
  return (
    <>
      <Head>
        <title>Account: Vouchers | SJB Therapy</title>
      </Head>

      <AccountVouchersView />
    </>
  );
}
