// next
import Head from 'next/head';
// sections
import { VerificationView } from 'src/sections/auth/view';

// ----------------------------------------------------------------------

export default function RegisterCoverPage() {
  return (
    <>
      <Head>
        <title>Verification | SJB Therapy</title>
      </Head>

      <VerificationView />
    </>
  );
}
