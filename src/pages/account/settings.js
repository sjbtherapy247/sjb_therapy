import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { useSettingsContext } from 'src/components/settings';
// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { AccountSettingsView } from 'src/sections/_simo/view';

// ----------------------------------------------------------------------

AccountSettingsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountSettingsPage() {
  const { loading, user } = useSettingsContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading]);

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Account: Settings | SJB Therapy</title>
      </Head>

      <AccountSettingsView />
    </>
  );
  // }
}
