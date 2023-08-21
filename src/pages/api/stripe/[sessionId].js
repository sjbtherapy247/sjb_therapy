import Stripe from 'stripe';
import { createFirebaseAdminApp } from 'src/lib/createFireBaseAdminApp';

const { db } = createFirebaseAdminApp();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_Simo_Prod);

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
      // saved canceled payments and augment the data on successfull payments
      // update db on successfull with the cust details and line-items which for some reason are not in any of the webhook events
      if (checkoutSession?.payment_status === 'unpaid') {
        const payRef = db.ref('canceled').child(checkoutSession.id);
        try {
          await payRef.update(checkoutSession);
          await db.ref('canceled-test/').update(checkoutSession);
        } catch (error) {
          console.log(error, error.message);
        }
      } else if (checkoutSession?.payment_intent?.status === 'succeeded') {
        // update db with the line-items which for some reason are not in any of the webhook events
        try {
          const purchaseRef = db.ref(`purchases/${checkoutSession.payment_intent.id.slice(-7).toUpperCase()}`);
          await purchaseRef.update({ line_items: checkoutSession.line_items.data[0], customer_details: checkoutSession.customer_details });
          await db.ref('purchases/aaa_last').update({ line_items: checkoutSession.line_items.data[0], customer_details: checkoutSession.customer_details });
        } catch (error) {
          console.log(error, error.message);
        }
      }

      return res.status(200).json(checkoutSession);
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
  res.setHeader('Allow', 'GET');
  return res.status(405).end('Method Not Allowed');
}
