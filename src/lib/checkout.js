import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_Simo_Dev);

export const checkout = async (items, custId) => {
  console.log(items);
  try {
    const lineitems = items.map((product) => ({ price: product.id, quantity: 1 }));
    console.log(lineitems, custId);
    const response = await fetch('/api/stripe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lineitems, custId, api_key: process.env.NEXT_PUBLIC_API_ROUTE_SECRET }),
    });
    if (!response.ok) throw new Error('failed to fetch stripe session');
    const data = await response.json();
    console.log(data);

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId: data.session.id });

    if (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw error;
    }
  } catch (error) {
    console.log(error.message);
  }
};
