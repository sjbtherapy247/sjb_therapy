import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { useSettingsContext } from 'src/components/settings';
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
  const { loggedIn } = useSettingsContext();
  const { push } = useRouter();

  useEffect(() => {
    if (!loggedIn) push('/auth/login-cover');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  if (!loggedIn) return <LoadingScreen />;

  return (
    <>
      <Head>
        <title>Account: Settings | SJB Therapy</title>
      </Head>

      <AccountVouchersView />
    </>
  );
}
