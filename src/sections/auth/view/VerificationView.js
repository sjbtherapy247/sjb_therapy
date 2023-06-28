// next
import { useRouter } from 'next/router';
// fb
import { applyActionCode, checkActionCode, signOut, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

// @mui
import { Stack } from '@mui/material';
// components
//
import { useCallback, useEffect } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { auth } from 'src/lib/createFirebaseApp';
import { AuthCarousel } from '../components';
import ResetPasswordVerification from '../components/ResetPasswordVerification';
import EmailSignInSetPassword from '../components/EmailSignInSetPassword';

// ----------------------------------------------------------------------

export default function VerificationView() {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    // code using router.query
    const {
      query: { oobCode, mode },
    } = router;

    if (!oobCode || !mode) {
      router.back();
      return;
    }

    verifyUser(oobCode, mode);
  }, [router.isReady]);

  const {
    currentUser,
    // setLogin,
    dispatch,
    state: { alert, modal },
  } = useSettingsContext();

  const verifyUser = async (oobCode, mode) => {
    console.log('verify fct ran');

    if (oobCode) {
      dispatch({ type: 'START_LOADING' });

      // do stuff
      try {
        // action code boundary
        switch (mode) {
          // case 'verifyEmail': {
          //   // const result = await checkActionCode(auth, oobCode);
          //   await applyActionCode(auth, oobCode);
          //   // await reload(auth.currentUser);
          //   console.log(auth.currentUser);
          //   console.log(currentUser);
          //   // setLogin(true);

          //   router.push('/');
          //   dispatch({ type: 'END_LOADING' });
          //   dispatch({
          //     type: 'UPDATE_ALERT',
          //     payload: {
          //       ...alert,
          //       open: true,
          //       severity: 'success',
          //       message: 'Email verified. Welcome to SCC Members',
          //       duration: 6000,
          //     },
          //   });
          //   getUserDoc(auth.currentUser.uid).then((userDoc) => {
          //     let user = Object.assign(auth.currentUser, userDoc.data());

          //     //TODO fix this
          //     if (user?.emailVerified && user?.uRole?.createPost === undefined) {
          //       // let x = { uRole: { ...user?.uRole, createPost: true, nippersEditor: false } };
          //       updateUserRecords('Users', user.uid, {
          //         uRole: { ...user?.uRole, createPost: true, nippersEditor: false, email: false },
          //       })
          //         .then((result) => console.log('User role updated', result))
          //         .catch((error) => console.log('Error updated user roles', error));
          //     }
          //   });
          //   break;
          // }
          case 'signIn': {
            if (isSignInWithEmailLink(auth, window.location.href)) {
              // Additional state parameters can also be passed via URL.
              dispatch({ type: 'END_LOADING' });
              dispatch({
                type: 'MODAL',
                payload: {
                  ...modal,
                  open: true,
                  title: 'Create Password',
                  content: <EmailSignInSetPassword />,
                },
              });
            }
            break;
          }
          case 'verifyAndChangeEmail': {
            // const result = await checkActionCode(auth, oobCode);
            await applyActionCode(auth, oobCode);
            console.log(auth.currentUser);
            console.log(currentUser);

            router.push('/');
            dispatch({ type: 'END_LOADING' });
            dispatch({
              type: 'UPDATE_ALERT',
              payload: {
                ...alert,
                open: true,
                severity: 'success',
                message: 'Your new email has been verified. You now have full access to SCC Members',
                duration: 8000,
              },
            });

            break;
          }
          case 'recoverEmail': {
            // const result = await checkActionCode(auth, oobCode);
            await applyActionCode(auth, oobCode);
            // await reload(auth.currentUser);
            dispatch({ type: 'END_LOADING' });
            console.log(auth.currentUser);
            console.log(currentUser);
            router.push('/');
            dispatch({
              type: 'UPDATE_ALERT',
              payload: {
                ...alert,
                open: true,
                severity: 'success',
                message: `Your email change has been reversed. For security reasons existing sessions have expired. You can sign back in using your original credentials. We strongly recommend you change your password if you did not initiate this email change!`,
                duration: 10000,
              },
            });

            router.push('/');
            signOut(auth);

            break;
          }
          case 'resetPassword': {
            await checkActionCode(auth, oobCode);
            // if the code is ok proceed
            dispatch({ type: 'END_LOADING' });
            dispatch({
              type: 'MODAL',
              payload: {
                ...modal,
                open: true,
                title: 'Reset Password',
                content: <ResetPasswordVerification oobCode={oobCode} />,
              },
            });

            break;
          }

          default:
            break;
        }
      } catch (error) {
        dispatch({ type: 'END_LOADING' });
        console.log(error, error.message);
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'error',
            message: error.message,
            duration: 6000,
          },
        });
        router.push('/');
      }
    }
  };

  return (
    <Stack direction="row" sx={{ minHeight: 1 }}>
      {/* <Box
        sx={{
          width: { xs: 1, md: 480 },
          p: (theme) => ({
            xs: theme.spacing(4, 2),
            md: theme.spacing(5, 10),
          }),
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Logo />
        </Box>
        <Stack
          sx={{
            pb: 5,
            pt: { xs: 5, md: 5 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h3" paragraph>
            One Moment..
          </Typography>{' '}
          <Typography variant="h4" paragraph>
            Verifying your details
          </Typography>
        </Stack> */}

      {/* <AuthWithSocial /> */}

      {/* <Divider sx={{ py: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            OR
          </Typography>
        </Divider> */}

      {/* <AuthRegisterForm /> */}
      {/* </Box> */}

      <AuthCarousel title="Client Verification" images={['/assets/sjb-logo/Hmobile.jpg', '/assets/sjb-logo/Hdocs-large.jpg']} />
    </Stack>
  );
}
