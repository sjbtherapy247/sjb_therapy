// next
// sections
import { VerificationView } from 'src/sections/auth/view';

export async function getStaticProps() {
  return {
    props: {
      title: 'Client Verification | TRANCEform with Simon',
      canonical: 'https://sjbtherapy.com/auth/verification/',
    },
  };
}
// ----------------------------------------------------------------------

export default function RegisterCoverPage() {
  return <VerificationView />;
}
