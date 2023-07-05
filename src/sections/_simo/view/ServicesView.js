// fb
import { db } from 'src/lib/createFirebaseApp';
import { ref, update } from 'firebase/database';

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
  const {
    dispatch,
    state: { modal },
  } = useSettingsContext();

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    // code using router.query
    // fallback for BS behaviour of anchors not working on reloads
    if (router.asPath.includes('#')) {
      const anchor = router.asPath.split('#')[1];
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
      }
    }

    const {
      query: { sessionId },
    } = router;
    if (sessionId) {
      console.log('calling checkout');
      getCheckoutSession(sessionId);
    }
  }, [router.isReady]);

  async function getCheckoutSession(Id) {
    const responseJson = await fetch(`/api/stripe/${Id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ api_key: process.env.NEXT_PUBLIC_API_ROUTE_SECRET }),
    }).then((res) => res.json());
    // make sure we got a successful payment otherwise just quietly log the cancelled payment
    if (responseJson?.payment_intent?.status === 'succeeded') {
      dispatch({
        type: 'MODAL',
        payload: {
          ...modal,
          open: true,
          title: 'Purchase Success',
          content: <PurchaseSuccess checkout={responseJson} />,
        },
      });
      // update db with the line-items which for some reason are not in any of the webhook events
      window.localStorage.setItem('emailForSignIn', responseJson?.customer_details?.email);
      const purchaseRef = ref(db, `purchases/${responseJson.payment_intent.id.slice(-7).toUpperCase()}`);
      console.log(responseJson);
      update(purchaseRef, { line_items: responseJson.line_items.data[0] });
      update(purchaseRef, { customer_details: responseJson.customer_details });
    } else {
      console.log('payment canceled!');
      console.log(responseJson);
    }
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
