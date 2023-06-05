// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import ResearchView from 'src/sections/_simo/view/ResearchView';
import { research } from 'src/sections/_simo/research/articles';

export async function getStaticProps() {
  console.log(research);
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
  console.log(researchDocs);
  return (
    <>
      <Head>
        <title>Research | SJB Therapy</title>
      </Head>

      <ResearchView researchDocs={researchDocs} />
    </>
  );
}
