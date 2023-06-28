// next
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
// sections
import { LoginCoverView } from 'src/sections/auth/view';
import { useRouter } from 'next/router';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function LoginCoverPage() {
  const { loading, user } = useSettingsContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading]);

  if (!user && loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Login | SJB Therapy</title>
      </Head>

      <LoginCoverView />
    </>
  );
}
