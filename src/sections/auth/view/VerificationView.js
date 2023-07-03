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
    user,
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
            // await reload(auth.user);
            dispatch({ type: 'END_LOADING' });
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
