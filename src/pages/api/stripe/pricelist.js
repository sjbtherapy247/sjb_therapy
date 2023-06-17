import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_Simo_Dev);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data: prices } = await stripe.prices.list({
        active: true,
        limit: 10,
        expand: ['data.product'],
      });
      return res.status(200).json(prices);
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
  res.setHeader('Allow', 'GET');
  return res.status(405).end('Method Not Allowed');
}
