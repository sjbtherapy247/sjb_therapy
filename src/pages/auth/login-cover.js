// next
import Head from 'next/head';
import { useSettingsContext } from 'src/components/settings';
// sections
import { LoginCoverView } from 'src/sections/auth/view';
import { useRouter } from 'next/router';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

// ----------------------------------------------------------------------

export default function LoginCoverPage() {
  const { loggedIn } = useSettingsContext();
  const router = useRouter();

  if (loggedIn) {
    router.push('/');
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
