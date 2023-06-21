import { Resend } from 'resend';
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { createFirebaseAdminApp } from '../../../lib/createFireBaseAdminApp';

const resend = new Resend(process.env.RESEND_API_KEY);

console.log(admin.apps);
createFirebaseAdminApp();

export default async function handler(req, res) {
  const test = true;
  let currentUser = {};
  const email = req.body?.currentUserEmail;

  if (req.method === 'POST') {
    if (test) {
      try {
        const actionCodeSettings = {
          // URL you want to redirect back to. The domain (www.example.com) for
          // this URL must be whitelisted in the Firebase Console.
          url: 'http://192.168.0.220:5002',
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
        currentUser = await getAuth().getUserByEmail(email);
        const link = await getAuth().generateSignInWithEmailLink(email, actionCodeSettings);
        const emailVerify = await getAuth().generateEmailVerificationLink(email, actionCodeSettings);
        // console.log(currentUser, link);
        // return res.status(200).json({ ...currentUser });
        return res.status(200).json({ ...currentUser, signin: link, emailverify: emailVerify });
      } catch (error) {
        console.log('Error fetching user data:', error.message);
        currentUser = 'Error fetching user';
        return res.status(200).json(currentUser);
      }
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
  return null;
}

const emailTemplate = ({ firstName }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>To reset your account please hit the button</p>
    <div>
      <a href="https://simo-dev.vercel.app" target="_blank">
        <button type="button">Reset</button>
      </a>
    </div>
  </div>
);

// const newTemplate = () => (
//   <html lang="en">

//   <head></head>
//   <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Dropbox reset your password
//   </div>

//   <body style="background-color:#f6f9fc;padding:10px 0">
//     <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;border:1px solid #f0f0f0;padding:45px">
//       <tr style="width:100%">
//         <td><img alt="Dropbox" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/dropbox-logo.png" width="40" height="33" style="display:block;outline:none;border:none;text-decoration:none" />
//           <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
//             <tbody>
//               <tr>
//                 <td>
//                   <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">Hi Zeno,</p>
//                   <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">Someone recently requested a password change for your Dropbox account. If this was you, you can set a new password here:</p><a href="https://dropbox.com" target="_blank" style="background-color:#007ee6;border-radius:4px;color:#fff;font-family:&#x27;Open Sans&#x27;, &#x27;Helvetica Neue&#x27;, Arial;font-size:15px;text-decoration:none;text-align:center;display:inline-block;width:210px;padding:0px 0px;line-height:100%;max-width:100%"><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%;mso-text-raise:0" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#007ee6;border-radius:4px;color:#fff;font-family:&#x27;Open Sans&#x27;, &#x27;Helvetica Neue&#x27;, Arial;font-size:15px;text-decoration:none;text-align:center;display:inline-block;width:210px;padding:14px 7px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:0">Reset password</span><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>
//                   <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">If you don&#x27;t want to change your password or didn&#x27;t request this, just ignore and delete this message.</p>
//                   <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">To keep your account secure, please don&#x27;t forward this email to anyone. See our Help Center for <a target="_blank" style="color:#067df7;text-decoration:underline" href="https://dropbox.com">more security tips.</a></p>
//                   <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:#404040">Happy Dropboxing!</p>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </td>
//       </tr>
//     </table>
//   </body>

// </html>
// )
