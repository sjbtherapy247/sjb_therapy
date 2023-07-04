import { buffer } from 'micro';
import Stripe from 'stripe';
// import admin from 'firebase-admin';
import { createFirebaseAdminApp } from 'src/lib/createFireBaseAdminApp';

console.log('init webhook');

const { db } = createFirebaseAdminApp();

// const ref = db.ref('ter');
// ref.once('value', (snapshot) => {
//   console.log(snapshot.val());
// });

export const config = {
  api: {
    bodyParser: false,
  },
};
// every webhook endpoint has unique key
// for some reason the local key works for a while..
// TODO - switch whsec key to endpoint specific key in prod
export default async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_Simo_Dev);

  const webhookSecret = process.env.NODE_ENV === 'development' ? process.env.STRIPE_WEBHOOK_SECRET_Simo_Dev : process.env.STRIPE_WEBHOOK_SECRET_Simo_Dev_Vercel;

  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    // Handle the event   curl -X POST http://192.168.0.220:5002/api/stripe/webhook/ -H "Content-Type: application/json" -d '{"Id": 79, "status": 3}'
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        // console.log(event.type, paymentIntent);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      }
      case 'customer.created': {
        console.log(event.data.object);
        // store the purchase
        const custRef = db.ref('customers').child(event.data.object.id);
        try {
          await custRef.update(event.data.object);
          await db.ref('cust-test/').update(event);
          console.log('customer created');
        } catch (error) {
          console.log(error, error.message);
        }

        break;
      }
      case 'charge.succeeded': {
        console.log(event.data.object);

        // console.log(event.data.object?.billing_details);
        // store the purchase
        const userRef = db.ref('purchases').child(event.data.object.payment_intent.slice(-7).toUpperCase());

        try {
          await userRef.update(event.data.object);
          await db.ref('charge-test/').update(event);
          console.log('charge succeeded');
        } catch (error) {
          console.log(error, error.message);
        }

        break;
      }
      case 'payment_method.attached': {
        const paymentMethod = event.data.object;
        // console.log(event.type, paymentMethod);
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      }
      // ... handle other event types
      default:
      // console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
