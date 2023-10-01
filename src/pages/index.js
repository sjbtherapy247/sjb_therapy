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
      title: 'SJB Therapy - Your next step to a better you!!',
      description:
        'SjB Therapy is a hypnotherapy practice dedicated to helping people improve their lives. Through the use hypnosis we help people overcome a variety of challenges, including anxiety, depression, pain, addiction and also personal performance.',
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
