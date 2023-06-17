// _mock
import { research } from 'src/sections/_simo/insights/articles';
// components
import ScrollProgress from 'src/components/scroll-progress';
//
// import { useSettingsContext } from 'src/components/settings';
import PricingHome from 'src/sections/_simo/pricing';
import {
  HomeHero,
  HomeFAQs,
  // HomeNewStart,
  // HomeForDesigner,
  // HomeCombination,
  // HomeAdvertisement,
  HomeGuidedMeditation,
  HomeFamous,
  HomeBanner,
  // HomeFeatureHighlights,
  // HomeFlexibleComponents,
} from 'src/sections/_simo/home';
// import TestFooter from 'src/layouts/main/footer/TestFooter';
import { LatestPosts } from '../insights';

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <>
      <HomeHero />
      {/* <HomeGuidedMeditation />
      <HomeBanner />
      <HomeFamous />
      <HomeFAQs />
      <LatestPosts posts={research.slice(0, 4)} /> */}
      {/* <TestFooter /> */}
    </>
  );
}
