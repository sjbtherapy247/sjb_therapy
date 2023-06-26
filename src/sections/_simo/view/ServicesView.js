// _mock

//
import { Testimonial } from 'src/sections/_simo/testimonial';
import PricingHome from 'src/sections/_simo/pricing';

// import { services } from 'src/sections/_simo/services/services';
import { ServicesHero, ServicesInclude, ServicesBenefits, ServicesHowItWork } from 'src/sections/_simo/services';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { About } from '../mission';
import PurchaseSuccess from '../services/PurchaseSuccess';

// ----------------------------------------------------------------------

export default function ServicesView({ services, packages, prices }) {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const {
    dispatch,
    state: { alert, modal },
  } = useSettingsContext();

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    // code using router.query
    const {
      query: { sessionId },
    } = router;
    if (sessionId) {
      getCheckoutSession(sessionId);
    }
  }, [router.isReady]);

  async function getCheckoutSession(Id) {
    const responseJson = await fetch(`/api/stripe/${Id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    setCheckoutSuccess(true);
    dispatch({
      type: 'MODAL',
      payload: {
        ...modal,
        open: true,
        title: 'Purchase Success',
        content: <PurchaseSuccess checkout={responseJson} />,
      },
    });

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
