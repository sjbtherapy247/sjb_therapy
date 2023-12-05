// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import ResearchView from 'src/sections/_simo/view/ResearchView';
import { research } from 'src/sections/_simo/insights/articles';
import { useSettingsContext } from 'src/components/settings';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
// import { Metadata, ResolvingMetadata } from 'next';

export async function getStaticProps() {
  return {
    props: {
      researchDocs: [...research],
      title: 'Hypnotherapy InSights - News or Updates - SJB Therapy',
      description: 'Hypnotherapy insights, news and updates right here on the SjB Therapy InSights page. Any news on current hypnosis treatments or articles will appear here first.',
      canonical: 'https://sjbtherapy.com/insights/',
      keywords: 'insights, hypnotherapy, physcotherapy, news,',
    },
  };
}

// ----------------------------------------------------------------------

ResearchPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ResearchPage({ researchDocs }) {
  const { loading, host } = useSettingsContext();
  if (loading) {
    return <LoadingScreen />;
  }
  return <ResearchView researchDocs={researchDocs} />;
}
