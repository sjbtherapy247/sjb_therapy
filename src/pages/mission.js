// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { MissionView } from 'src/sections/_simo/view';

import { useSettingsContext } from 'src/components/settings';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

export async function getStaticProps() {
  return {
    props: {
      title: 'My Mission - Healing and Performance - Simon Baker',
      description: `My mission is to combine healing and performance in all hypnotherapy. Your wellness and mental strength is my passion and I won't stop until it's addressed.`,
      canonical: 'https://sjbtherapy.com/mission/',
      keywords: 'My Mission, healing and performance',
    },
  };
}

// ----------------------------------------------------------------------

OurMissionPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function OurMissionPage() {
  const { loading, host, error } = useSettingsContext();
  if (loading) {
    return <LoadingScreen />;
//  }
 // if (error) {
  //  return <ErrorComponent error={error} />;
  }
  return <MissionView />;
}
