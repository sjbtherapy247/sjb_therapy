// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import ArticleView from 'src/sections/_simo/view/ArticleView';

import { research } from 'src/sections/_simo/insights/articles';

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
    
        <meta name="title" content={researchDoc.title} />
        <meta name="description" content={researchDoc.description} />
        <meta name="keywords" content={researchDoc.keywords} />
      </Head>

      <ArticleView post={researchDoc} allPosts={researchDocs} />
    </>
  );
}
