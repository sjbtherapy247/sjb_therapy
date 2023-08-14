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
        <title>Account: Media | SJB Therapy</title>
      </Head>
      <AccountMediaView />
    </>
  );
}
