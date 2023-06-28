// next
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { useSettingsContext } from 'src/components/settings';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { AccountPersonalView } from 'src/sections/_simo/view';

// ----------------------------------------------------------------------

AccountPersonalPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function AccountPersonalPage() {
  const { loading, user } = useSettingsContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading]);

  if (!user && loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Account: Personal | SJB Therapy</title>
      </Head>

      <AccountPersonalView />
    </>
  );
}
