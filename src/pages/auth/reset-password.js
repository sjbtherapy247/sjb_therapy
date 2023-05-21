// next
import Head from 'next/head';
// layouts
import CompactLayout from 'src/layouts/compact';
// sections
import { ResetPasswordView } from 'src/sections/auth/view';

// ----------------------------------------------------------------------

ResetPasswordPage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>Reset Password | SJB Therapy</title>
      </Head>

      <ResetPasswordView />
    </>
  );
}
