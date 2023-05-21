// next
import Head from 'next/head';
// layouts
import CompactLayout from 'src/layouts/compact';
// sections
import { MaintenanceView } from 'src/sections/status/view';

// ----------------------------------------------------------------------

MaintenancePage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  return (
    <>
      <Head>
        <title>Maintenance | SJB Therapy</title>
      </Head>

      <MaintenanceView />
    </>
  );
}
