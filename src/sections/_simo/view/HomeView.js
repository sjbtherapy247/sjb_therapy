// _mock
import { _pricingHome } from 'src/_mock';
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

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <>
      <HomeHero />
      <HomeGuidedMeditation />
      {/* {!lightMode && <HomeGuidedMeditationDark />} */}
      <HomeFamous />
      <HomeFAQs />
      <PricingHome plans={_pricingHome} />
      {/* <HomeNewStart /> */}
      {/* <HomeForDesigner /> */}
      {/* <HomeCombination /> */}
      {/* <HomeAdvertisement /> */}
    </>
  );
}
