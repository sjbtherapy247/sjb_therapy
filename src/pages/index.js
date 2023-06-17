// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { HomeView } from 'src/sections/_simo/view';
import { research } from 'src/sections/_simo/insights/articles';

// ----------------------------------------------------------------------

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export async function getStaticProps() {
  return {
    props: {
      insights: [...research],
    },
  };
}

// ----------------------------------------------------------------------

// Entry point to website content

export default function HomePage({ insights }) {
  return (
    <>
      <Head>
        <title>SJB Therapy - Your next step to a better you!!</title>
      </Head>

      <HomeView insights={insights} />
    </>
  );
}
