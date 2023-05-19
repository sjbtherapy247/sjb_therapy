// _mock
import { _pricingHome } from 'src/_mock';
// components
import ScrollProgress from 'src/components/scroll-progress';
//
import { useSettingsContext } from 'src/components/settings';
import PricingHome from '../../pricing/home';
import {
  HomeHero,
  HomeFAQs,
  HomeNewStart,
  HomeForDesigner,
  HomeCombination,
  HomeAdvertisement,
  HomeGuidedMeditation,
  HomeFamous,
  // HomeFeatureHighlights,
  // HomeFlexibleComponents,
  // HomeGuidedMeditationDark,
} from '../components';

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <>
      <ScrollProgress />
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
