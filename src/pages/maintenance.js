// next
// layouts
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import CompactLayout from 'src/layouts/compact';
// sections
import { MaintenanceView } from 'src/sections/status/view';

export async function getStaticProps() {
  return {
    props: {
      title: 'Maintenance | SJB Therapy',
      canonical: 'https://sjbtherapy.com/maintenance',
    },
  };
}
// ----------------------------------------------------------------------

MaintenancePage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  return (
  <ErrorBoundary>
  <CompactLayout>
    <MaintenanceView />
  </CompactLayout>
  </ErrorBoundary>
)
};
