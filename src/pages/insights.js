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
      title: 'Hypnotherapy InSights - News and Updates - Simon Baker',
      description: 'Hypnosis Hypnotherapy insights, news and updates right here from Simon. Any news on current hypnosis treatments or articles that are amazing.',
      canonical: 'https://sjbtherapy.com/insights/',
      keywords: 'hypnotherapy, insights, physcotherapy, news, hypnosis,',
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
