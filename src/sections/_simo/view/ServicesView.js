// _mock

//
import { Testimonial } from 'src/sections/_simo/testimonial';
import PricingHome from 'src/sections/_simo/pricing';

// import { services } from 'src/sections/_simo/services/services';
import { ServicesHero, ServicesInclude, ServicesBenefits, ServicesHowItWork } from 'src/sections/_simo/services';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function ServicesView({ services, packages, prices }) {
  const {
    query: { sessionId },
  } = useRouter();

  if (sessionId) {
    console.log(sessionId);
    getCheckoutSession(sessionId);
  }

  async function getCheckoutSession(Id) {
    const responseJson = await fetch(`/api/stripe/${Id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    console.log(responseJson);
  }

  return (
    <>
      <ServicesHero />

      <ServicesInclude services={services} />

      <ServicesHowItWork />

      <ServicesBenefits />

      <PricingHome plans={packages} prices={prices} />

      <Testimonial />
    </>
  );
}
