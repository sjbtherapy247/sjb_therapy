// next
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSettingsContext } from 'src/components/settings';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { AccountMediaView } from 'src/sections/_simo/view';
import LoadingScreen from 'src/components/loading-screen';

// ----------------------------------------------------------------------

AccountMediaPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountMediaPage() {
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
        <title>Account: Media | SJB Therapy</title>
      </Head>
      <AccountMediaView />
    </>
  );
}
