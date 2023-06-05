// _mock
import { _pricingHome } from 'src/_mock';

//
import { Testimonial } from 'src/sections/_simo/testimonial';
import PricingHome from 'src/sections/_simo/pricing';

import { services } from 'src/sections/_simo/services/services';
import { ServicesHero, ServicesInclude, ServicesBenefits, ServicesHowItWork } from '../services';

// ----------------------------------------------------------------------

export default function ServicesView() {
  return (
    <>
      <ServicesHero />

      <ServicesInclude services={services} />

      <ServicesHowItWork />

      <ServicesBenefits />

      <PricingHome plans={_pricingHome} />
      <Testimonial />
    </>
  );
}
