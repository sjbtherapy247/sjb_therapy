// next
 import Head from 'next/head';
// layouts
 import SimpleLayout from 'src/layouts/simple/SimpleLayout';
// sections
 import { SupportView } from 'src/sections/support/view';
// import { redirect } from 'next/navigation';

 export async function getStaticProps() {
   return {
     props: {
       title: 'Client Support | SJB Therapy',
      canonical: 'https://sjbtherapy.com/support/',
    },
  };
 }
// ----------------------------------------------------------------------

// SupportPage.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>;

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
