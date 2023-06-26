import { buffer } from 'micro';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import { createFirebaseAdminApp } from 'src/lib/createFireBaseAdminApp';

console.log('init webhook');

const { app, db } = createFirebaseAdminApp();

// const ref = db.ref('ter');
// ref.once('value', (snapshot) => {
//   // console.log(snapshot.val());
// });

const purchases = db.ref('purchases');

export const config = {
  api: {
    bodyParser: false,
  },
};
// every webhook endpoint has unique key
export default async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_Simo_Dev);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_Simo_Dev;

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
      case 'charge.succeeded': {
        const checkoutID = event.data.object.payment_intent;
        // console.log(event.data.object);
        // store the purchase
        const userRef = purchases.child(event.data.object.payment_intent);
        userRef.update(event);
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
