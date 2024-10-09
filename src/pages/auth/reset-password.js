// next
// layouts
import CompactLayout from 'src/layouts/compact';
// sections
import { ResetPasswordView } from 'src/sections/auth/view';

export async function getStaticProps() {
  return {
    props: {
      title: 'Reset Password | TRANCEform with Simon',
      canonical: 'https://sjbtherapy.com/auth/reset-password/',
    },
  };
}
// ----------------------------------------------------------------------

ResetPasswordPage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return <ResetPasswordView />;
}
