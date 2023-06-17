import { HomeHero, HomeFAQs, HomeGuidedMeditation, HomeFamous, HomeBanner } from 'src/sections/_simo/home';
import { LatestPosts } from '../insights';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function HomeView({ insights }) {
  console.log('hello', insights);
  return (
    <>
      <HomeHero />
      <HomeGuidedMeditation />
      <HomeBanner />
      <HomeFamous />
      <HomeFAQs />
      <LatestPosts posts={insights.slice(0, 4)} />
      {/* <TestFooter /> */}
    </>
  );
}
