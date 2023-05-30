// _mock
import { _blogMarketingPosts, _testimonials } from 'src/_mock';
//
import { LatestPosts } from 'src/sections/_simo/research';
import { Testimonial } from 'src/sections/_simo/testimonial';
import {
  // Services,
  ServicesHero,
  ServicesInclude,
  ServicesBenefits,
  ServicesHowItWork,
} from '../services';

// ----------------------------------------------------------------------

export default function ServicesView() {
  return (
    <>
      <ServicesHero />

      {/* <Services /> */}

      <ServicesInclude />

      <ServicesBenefits />

      <ServicesHowItWork />

      <Testimonial />

      <LatestPosts posts={_blogMarketingPosts.slice(0, 4)} />
    </>
  );
}
