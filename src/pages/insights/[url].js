// next
// import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import ArticleView from 'src/sections/_simo/view/ArticleView';
import { NextSeo } from 'next-seo';
import { research } from 'src/sections/_simo/insights/articles';

export async function getStaticPaths() {
  return {
    paths: research.map((doc) => ({
      params: {
        url: doc.url.replace(/\/$/, ''), // Ensure no trailing slash
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
      image: `https://sjbtherapy.com${researchDoc.heroImg}`,
    },
  };
}

// ----------------------------------------------------------------------

ResearchArticlePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ResearchArticlePage({ researchDoc, researchDocs, title, description, keywords, canonical, image }) {
  return (
    <>
      <NextSeo>
        title= {researchDoc.title}
        description= {researchDoc.description}
        canonical= `https://sjbtherapy.com/insights/${researchDoc.url}`,
        openGraph={{
          url: researchDoc.url,
          title: researchDoc.title,
          description: researchDoc.description,
          images: [
            {
              url: `https://sjbtherapy.com${researchDoc.heroImg}`,
              width: 800,
              height: 600,
              alt: researchDoc.title,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: researchDoc.keywords,
          },
        ]}
        </NextSeo>
     
      <ArticleView post={researchDoc} allPosts={researchDocs} />
    </>
  );
}
