// _mock
// import { _testimonials, _members, _brandsColor } from 'src/_mock';
//

import {
  About,
  // AboutStory,
  // AboutOurVision,
  AboutOurMission,
  AboutCoreValues,
} from 'src/sections/_simo/mission';
// import { HomeFAQs } from 'src/sections/_simo/home';
import { Testimonial } from 'src/sections/_simo/testimonial';
// import Testimonial1 from 'src/sections/_simo/testimonial';

// ----------------------------------------------------------------------

export default function MissionView() {
  return (
    <>
      <AboutOurMission />
      {/* <AboutOurVision /> */}

      <AboutCoreValues />
      <About />

      {/* <AboutStory /> */}

      <Testimonial />
      {/* <Testimonial1 testimonials={_testimonials} /> */}

      {/* <HomeFAQs /> */}
    </>
  );
}
