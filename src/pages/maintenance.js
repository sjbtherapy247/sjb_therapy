// next
// layouts
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
  return <MaintenanceView />;
}
