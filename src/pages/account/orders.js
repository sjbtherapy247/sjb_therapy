// next
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { useSettingsContext } from 'src/components/settings';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { AccountOrdersView } from 'src/sections/_simo/view';

// ----------------------------------------------------------------------

AccountOrdersPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountOrdersPage() {
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
        <title>Account: Personal | SJB Therapy</title>
      </Head>

      <AccountOrdersView />
    </>
  );
}
