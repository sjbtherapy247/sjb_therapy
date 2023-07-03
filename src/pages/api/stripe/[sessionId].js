import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_Simo_Dev);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { sessionId } = req.query;
      const { api_key } = req.body;
      // check api key
      if (api_key !== process.env.API_ROUTE_SECRET) return res.status(401).json({ error: 'Bad request - Unauthorised Access' });
      if (!sessionId.startsWith('cs_')) throw new Error('Incorrect checkout session ID');
      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent', 'line_items.data.price.product', 'customer'],
      });
      return res.status(200).json(checkoutSession);
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
  res.setHeader('Allow', 'GET');
  return res.status(405).end('Method Not Allowed');
}
