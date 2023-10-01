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
      title: 'Our Mission | SJB Therapy',
      description: `Our mission is to combine healing and performance to everything we do. Your healing and mental strength is our passion and we will not stop until it's found.`,
      canonical: 'https://sjbtherapy.com/mission/',
      keywords: 'Our Mission, healing and performance',
    },
  };
}

// ----------------------------------------------------------------------

OurMissionPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function OurMissionPage() {
  const { loading, host } = useSettingsContext();
  if (loading) {
    return <LoadingScreen />;
  }
  return <MissionView />;
}
