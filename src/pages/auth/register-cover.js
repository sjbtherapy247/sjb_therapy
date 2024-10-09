// next
import Head from 'next/head';
// sections
import { RegisterCoverView } from 'src/sections/auth/view';

// ----------------------------------------------------------------------

export default function RegisterCoverPage() {
  return (
    <>
      <Head>
        <title>Register | TRANCEform with Simon</title>
      </Head>

      <RegisterCoverView />
    </>
  );
}
