import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_Simo_Dev);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { sessionId } = req.query;
      if (!sessionId.startsWith('cs_')) throw new Error('Incorrect checkout session ID');
      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent', 'line_items.data.price.product'],
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
