// next
import Head from 'next/head';
import Link from 'next/link'; // Import Link
import Image from 'next/image'; // Import Image
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { HomeView } from 'src/sections/_simo/view';
import { research } from 'src/sections/_simo/insights/articles';
import { useSettingsContext } from 'src/components/settings';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

// ----------------------------------------------------------------------

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

// Entry point to website content

export default function HomePage({ insights }) {
  const { loading, host } = useSettingsContext();
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>Simon Baker Hypnotherapist - Hypnotherapy in Sydney</title>
        <meta name="description" content="Welcome to my hypnotherapy practice. I am dedicated to helping people improve their lives, through the use hypnosis. Book your Free session today." />
        <link rel="canonical" href="https://sjbtherapy.com" />
        {/* Add more meta tags as needed */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Simon Baker Hypnotherapist",
              "description": "Welcome to my hypnotherapy practice. I am dedicated to helping people improve their lives, through the use hypnosis. Book your Free session today.",
              "url": "https://sjbtherapy.com",
              // Add more structured data properties as needed
            }
          `}
        </script>
      </Head>
      <HomeView insights={insights} />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      insights: [...research],
    },
  };
}