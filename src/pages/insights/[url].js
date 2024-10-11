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
    fallback: 'blocking', // Enabling ISR if you want to add more posts in the future
  };
}

export async function getStaticProps(context) {
  const researchDoc = research.find((doc) => doc.url === context.params.url);

  // Return 404 if no matching article is found
  if (!researchDoc) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      researchDocs: [...research],
      researchDoc,
      title: researchDoc.title || 'Research Article',
      description: researchDoc.description,
      keywords: researchDoc.keywords || '',
      canonical: `https://sjbtherapy.com/insights/${researchDoc.url}`,
      image: `https://sjbtherapy.com${researchDoc.heroImg || ''}`,
    },
    revalidate: 10, // Revalidate every 10 seconds for ISR (Incremental Static Regeneration)
  };
}

// ----------------------------------------------------------------------

ResearchArticlePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ResearchArticlePage({ researchDoc, researchDocs, title, description, keywords, canonical, image }) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          url: canonical,
          title,
          description,
          images: [
            {
              url: image || 'https://sjbtherapy.com/default-image.jpg', // Fallback image
              width: 800,
              height: 600,
              alt: title,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: keywords,
          },
        ]}
        twitter={{
          cardType: 'summary_large_image',
          site: '@yourtwitterhandle', // Replace with actual Twitter handle
          title,
          description,
          image: image || 'https://sjbtherapy.com/default-image.jpg', // Fallback image
        }}
      />

      <ArticleView post={researchDoc} allPosts={researchDocs} />
    </>
  );
}
