// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import PostView from 'src/sections/_simo/view/PostView';

import { research } from 'src/sections/_simo/research/articles';

export async function getStaticPaths() {
  return {
    paths: research.map((doc) => ({
      params: {
        url: doc.url,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const researchDoc = research.filter((doc) => doc.url === context.params.url)[0];

  return {
    props: {
      researchDocs: [...research],
      researchDoc,
    },
  };
}

// ----------------------------------------------------------------------

ResearchArticlePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ResearchArticlePage({ researchDoc, researchDocs }) {
  return (
    <>
      <Head>
        <title>The A-Z Of Event Post | SJB Therapy</title>
      </Head>

      <PostView post={researchDoc} allPosts={researchDocs} />
    </>
  );
}
