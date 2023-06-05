// _mock
import { research } from 'src/sections/_simo/research/articles';
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
  // HomeFeatureHighlights,
  // HomeFlexibleComponents,
} from 'src/sections/_simo/home';
import { LatestPosts } from '../research';

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <>
      <HomeHero />
      <HomeGuidedMeditation />
      <HomeFamous />
      <HomeFAQs />
      <LatestPosts posts={research.slice(0, 4)} />
    </>
  );
}
