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
// for some reason the local dev key works for a while..
// TODO - switch whsec key to endpoint specific key in prod - DONE!
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
    switch (event.type) {
      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object;
        // store the purchase
        const payRef = db.ref('canceled').child(event.data.object.id);
        try {
          await payRef.update(event.data.object);
          await db.ref('canceled-test/').update(event);
        } catch (error) {
          console.log(error, error.message);
        }
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
        console.log(event.data.object?.customer);

        // console.log(event.data.object?.billing_details);
        // check if purchase was a deposit customer and create the customer ID
        if (event.data.object?.customer === null) {
          console.log('guest customer charge');
          // const { address = '', email, phone = '', name = '' } = event.data.object.billing_details;
          const newCust = await stripe.customers.create(event.data.object.billing_details);
          const custRef = db.ref('customers').child(newCust.id);
          event.data.object.customer = newCust.id;
          try {
            await custRef.update(newCust);
            await db.ref('guest-cust-test/').update(newCust);
            console.log('guest customer created');
          } catch (error) {
            console.log(error, error.message);
          }
          // event.data.object.customer = newCust;
        }

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
      // case 'payment_method.attached': {
      //   const paymentMethod = event.data.object;
      //   // console.log(event.type, paymentMethod);
      //   // Then define and call a method to handle the successful attachment of a PaymentMethod.
      //   // handlePaymentMethodAttached(paymentMethod);
      //   break;
      // }
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
