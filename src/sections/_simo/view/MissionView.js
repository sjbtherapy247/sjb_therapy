// _mock
import { _testimonials, _members, _brandsColor } from 'src/_mock';
//
import {
  About,
  // AboutStory,
  // AboutOurVision,
  AboutOurMission,
  AboutCoreValues,
} from 'src/sections/_simo/mission';
import { HomeFAQs } from 'src/sections/_home/components';
import { Testimonial, Testimonial1 } from 'src/sections/_simo/testimonial';
// import Testimonial1 from 'src/sections/_simo/testimonial';

// ----------------------------------------------------------------------

export default function MissionView() {
  return (
    <>
      <AboutOurMission />
      {/* <AboutOurVision /> */}
      <About />

      <AboutCoreValues />

      {/* <AboutStory /> */}

      <Testimonial testimonials={_testimonials} />
      {/* <Testimonial1 testimonials={_testimonials} /> */}

      <HomeFAQs />
    </>
  );
}
