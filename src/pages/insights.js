// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import ResearchView from 'src/sections/_simo/view/ResearchView';
import { research } from 'src/sections/_simo/insights/articles';

export async function getStaticProps() {
  return {
    props: {
      researchDocs: [...research],
    },
  };
}

// ----------------------------------------------------------------------

ResearchPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ResearchPage({ researchDocs }) {
  return (
    <>
      <Head>
        <title>InSights | SJB Therapy</title>
      </Head>

      <ResearchView researchDocs={researchDocs} />
    </>
  );
}
