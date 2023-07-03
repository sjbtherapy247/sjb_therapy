// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { HomeView } from 'src/sections/_simo/view';
import { research } from 'src/sections/_simo/insights/articles';
import { useSettingsContext } from 'src/components/settings';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

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
  const { loading } = useSettingsContext();
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Head>
        <title>SJB Therapy - Your next step to a better you!!</title>
      </Head>

      <HomeView insights={insights} />
    </>
  );
}
