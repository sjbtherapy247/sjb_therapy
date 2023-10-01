// next
// sections
import { VerificationView } from 'src/sections/auth/view';

export async function getStaticProps() {
  return {
    props: {
      title: 'Client Verification | SJB Therapy',
      canonical: 'https://sjbtherapy.com/auth/verification/',
    },
  };
}
// ----------------------------------------------------------------------

export default function RegisterCoverPage() {
  return <VerificationView />;
}
