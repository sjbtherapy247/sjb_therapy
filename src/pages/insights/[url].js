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
      title: researchDoc.title || 'Research Article',
      description: researchDoc.description,
      keywords: researchDoc.keywords,
      canonical: `https://sjbtherapy.com/insights/${researchDoc.url}`,
      image: `https://sjbtherapy.com/assets/images/marketing/${researchDoc.heroImg}`,
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
