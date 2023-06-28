// Expirations
// Password reset (generatePasswordResetLink): 1 hour
// Email verification (generateEmailVerificationLink): 3 days (not using as users are forced to signIn with email from the start)
// Email link sign-in (generateSignInWithEmailLink): 6 hours

import { Resend } from 'resend';
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { createFirebaseAdminApp } from 'src/lib/createFireBaseAdminApp';
import ResetPasswordEmail from 'src/components/email/ResetPasswordEmail';
import SignUpEmail from 'src/components/email/SignupEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

console.log(admin.apps);
createFirebaseAdminApp();

export default async function handler(req, res) {
  let currentUser = {}; // if user is a current client it will populate
  // operation
  const mode = req.body?.mode;
  // will hold the correct link depending on mode
  let link = null;
  // email variables
  const email = req.body?.currentUserEmail;
  const name = req.body?.currentUserName;
  const newUserEmail = req.body?.newUserEmail;

  if (req.method === 'POST') {
    try {
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for
        // this URL must be whitelisted in the Firebase Console.
        url: 'https://simo-dev.vercel.app',
        // url: 'http://192.168.0.220:5002',
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
          return res.status(200).json({ signin: link });
        }
        // case 'emailVerify': {
        //   link = await getAuth().generateEmailVerificationLink(email, actionCodeSettings);
        //   return res.status(200).json({ signin: link });
        // }
        case 'resetPassword': {
          link = await getAuth().generatePasswordResetLink(email, actionCodeSettings);
          try {
            const data = await resend.emails.send({
              from: 'support@sjbtherapy.com',
              to: email,
              subject: 'SJB Therapy - Reset Password',
              html: '<strong>Request to reset password</strong>',
              react: ResetPasswordEmail({ link, email, name }),
            });
          } catch (error) {
            console.log(error);
          }
          return res.status(200).json({ signin: link });
        }
        case 'changeEmail': {
          link = await getAuth().generateVerifyAndChangeEmailLink(email, newUserEmail, actionCodeSettings);
          return res.status(200).json({ signin: link });
        }
        case 'isClient': {
          currentUser = await getAuth().getUserByEmail(email);
          return res.status(200).json({ ...currentUser });
        }
        default: {
          return res.status(200).json({ error: 'No mode' });
        }
      }
    } catch (error) {
      console.log('Error fetching user data:', error.message);
      currentUser = 'Error fetching user';
      return res.status(200).json(currentUser);
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

const emailTemplate = ({ link, email }) => (
  <div>
    <p>email sent to {email}</p>
    <h1>Welcome to SJB Therapy!</h1>
    <p>To finalise your account setup please hit the button</p>
    <div>
      <a href={link} target="_blank">
        <button type="button">I Love SJB Therapy.. YEAY!!!</button>
      </a>
    </div>
  </div>
);
