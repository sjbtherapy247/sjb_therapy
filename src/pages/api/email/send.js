// Expirations
// Password reset (generatePasswordResetLink): 1 hour
// Email verification (generateEmailVerificationLink): 3 days (not using as users are forced to signIn with email from the start)
// Email link sign-in (generateSignInWithEmailLink): 6 hours
// generate an API key
// node -e "console.log(crypto.randomBytes(32).toString('hex'))"

import { Resend } from 'resend';
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

// import { getAuth } from 'firebase-admin/auth';
import { createFirebaseAdminApp } from 'src/lib/createFireBaseAdminApp';
import ResetPasswordEmail from 'src/components/email/ResetPasswordEmail';
import SignUpEmail from 'src/components/email/SignupEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const { db } = createFirebaseAdminApp();
const host = process.env.NODE_ENV === 'development' ? 'http://192.168.0.220:5002' : 'https://sjbtherapy.com';

// Lets connect the email API server to the customer database
const ref = db.ref('customers/');
let customers = [];
ref.on(
  'value',
  (snapshot) => {
    if (snapshot.val()) customers = Object.values(snapshot.val());
  },
  (error) => {
    console.log('Error reading DB', error.name, error.message);
  }
);

console.log('init fb apps', admin.apps);

export default async function handler(req, res) {
  if (req.body.api_key !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send('Not Authorised To Access This API');
  }
  let currentUser = {}; // if user is a current client it will populate
  // mode and email vars
  const { mode, currentUserEmail: email } = req.body;
  const name = req.body?.currentUserName;
  // will hold the correct link depending on mode
  let link = null;

  if (req.method === 'POST') {
    try {
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for
        // this URL must be whitelisted in the Firebase Console.
        url: host,
        // This must be true for email link sign-in.
        // handleCodeInApp: true,
        // iOS: {
        //   bundleId: 'com.example.ios',
        // },
        // android: {
        //   packageName: 'com.example.android',
        //   installApp: true,
        //   minimumVersion: '12',
        // },
        // // FDL custom domain.
        // dynamicLinkDomain: 'coolapp.page.link',
      };

      switch (mode) {
        case 'signInWithEmail': {
          link = await getAuth().generateSignInWithEmailLink(email, actionCodeSettings);
          try {
            const data = await resend.emails.send({
              from: 'onboarding@sjbtherapy.com',
              to: email,
              subject: 'Welcome to SJB Therapy',
              html: '<strong>Please finalise your account setup</strong>',
              react: SignUpEmail({ link, email, name }),
            });
          } catch (error) {
            console.log(error);
          }
          await db.ref('server_customers/').update({ ...customers }); // sends update to db - lets us know the server is in sync
          return res.status(200).json({ signin: link });
        }
        // case 'emailVerify': {
        //   link = await getAuth().generateEmailVerificationLink(email, actionCodeSettings);
        //   return res.status(200).json({ signin: link });
        // }
        case 'resetPassword': {
          link = await getAuth().generatePasswordResetLink(email, actionCodeSettings);
          const user = customers.filter((cust) => cust.email === email);
          const fullName = user[0]?.acct_per_details?.fname || user[0].name;
          const firstName = fullName.split(/[ ]+/)[0];
          try {
            const data = await resend.emails.send({
              from: 'support@sjbtherapy.com',
              to: email,
              subject: 'SJB Therapy - Reset Password',
              html: '<strong>Request to reset password</strong>',
              react: ResetPasswordEmail({ link, email, name: firstName }),
            });
          } catch (error) {
            console.log(error);
          }
          await db.ref('server_customers/').update({ ...customers });
          return res.status(200).json({ signin: link, user: user[0], fullName, firstName });
        }
        // case 'changeEmail': {
        //   link = await getAuth().generateVerifyAndChangeEmailLink(email, newUserEmail, actionCodeSettings);
        //   return res.status(200).json({ signin: link });
        // }
        case 'isClient': {
          currentUser = await getAuth().getUserByEmail(email);
          return res.status(200).json({ ...currentUser });
        }
        default: {
          return res.status(200).json({ error: 'No mode' });
        }
      }
    } catch (error) {
      console.log('Error in Email API', error.message);
      currentUser = 'Error fetching user';
      return res.status(200).json({ error: 'Error in Email API', reason: error });
    }

    // try {
    //   const data = await resend.emails.send({
    //     from: 'onboarding@resend.dev',
    //     to: email,
    //     subject: 'TezD Nextjs Proj',
    //     html: '<strong>It works!</strong>',
    //     react: emailTemplate({ firstName: 'John' }),
    //   });

    //   res.status(200).json(data);
    // } catch (error) {
    //   console.log(error);
    //   return res.status(error.statusCode || 500).json({ message: error.message });
    // }
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
  // return null;
}
