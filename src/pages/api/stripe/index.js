import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_Simo_Dev);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { lineitems, custId, api_key } = req.body;
      // check api key
      if (api_key !== process.env.API_ROUTE_SECRET) return res.status(401).json({ error: 'Bad request - Unauthorised Access' });
      // check for line items
      if (!lineitems?.length) return res.status(400).json({ error: 'Bad request - no line items!' });

      const sessionObj = {
        line_items: lineitems,
        phone_number_collection: {
          enabled: true,
        },
        ...(custId && { customer: custId }),
        ...(!custId && { customer_creation: 'always' }),
        mode: 'payment',
        // success_url: `${req.headers.origin}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
        success_url: `${req.headers.origin}/services?sessionId={CHECKOUT_SESSION_ID}#hypnotherapyPackages`,
        cancel_url: `${req.headers.origin}/services?sessionId={CHECKOUT_SESSION_ID}#hypnotherapyPackages`,
      };
      const session = await stripe.checkout.sessions.create(sessionObj);
      return res.status(200).json({ session });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}
