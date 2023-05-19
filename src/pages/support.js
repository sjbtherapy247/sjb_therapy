// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
import SimpleLayout from 'src/layouts/simple/SimpleLayout';
// sections
import { SupportView } from 'src/sections/support/view';

// ----------------------------------------------------------------------

SupportPage.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function SupportPage() {
  return (
    <>
      <Head>
        <title>Support | SJB Therapy</title>
      </Head>

      <SupportView />
    </>
  );
}
