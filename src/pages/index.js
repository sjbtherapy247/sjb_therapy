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
      title: 'Simon Baker Hypnotherapist - Hypnotherapy in Sydney',
      description:
        'Welcome to my hypnotherapy practice. I am dedicated to helping people improve their lives, through the use hypnosis. Book your Free session today.',
      canonical: 'https://sjbtherapy.com',
      // keywords: ' some keywords '
    },
    
  };
}

// ----------------------------------------------------------------------

// Entry point to website content

export default function HomePage({ insights }) {
  const { loading, host } = useSettingsContext();
  if (loading) {
    return <LoadingScreen />;
  }
  
  return <HomeView insights={insights} />;
}
