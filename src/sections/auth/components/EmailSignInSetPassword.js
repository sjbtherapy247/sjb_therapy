import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { signInWithEmailLink, updatePassword } from 'firebase/auth';
import { auth } from 'src/lib/createFirebaseApp';
import { useSettingsContext } from 'src/components/settings';
import { useRouter } from 'next/router';
import Iconify from 'src/components/iconify/Iconify';
import PasswordField from './PasswordField';

const EmailSignInSetPassword = () => {
  const router = useRouter();

  const {
    dispatch,
    state: { alert, modal },
  } = useSettingsContext();
  const emailRef = useRef('');
  const savedEmailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const [emailError, setEmailError] = useState(false);
  const [pwordError, setPwordError] = useState(false);
  const [emailSaved, setEmailSaved] = useState(true);

  // check if this is same device and get email from local storage
  // let email = window.localStorage.getItem('emailForSignIn');
  useEffect(() => {
    savedEmailRef.current = window.localStorage.getItem('emailForSignIn');
    // no email render the email input box
    if (!savedEmailRef.current) setEmailSaved(false);
    console.log('setEmail ran');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // email is either the saved version or coming from the dialog
    const email = emailSaved ? savedEmailRef.current : emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    try {
      // password error boundary
      // no email saved locally and no email input in email field
      if (!email && !emailSaved) {
        setEmailError(true);
        throw new Error('Please provide an email');
      }

      if (password !== confirmPassword) {
        setPwordError(true);
        throw new Error('Passwords do not match, please check for typos');
      }
      if (password.length < 8) {
        setPwordError(true);
        throw new Error('Passwords must be a minimum of 8 characters!');
      }
      dispatch({ type: 'START_LOADING' });
      try {
        // The client SDK will parse the code from the link for you.
        const result = await signInWithEmailLink(auth, email, window.location.href);
        console.log(result.user);
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        updatePassword(result.user, password)
          .then(() => {
            console.log('password updated');
            // Update successful.
          })
          .catch((error) => {
            console.log('password updated');
            // An error ocurred
          });

        // You can access the new user via result.user
        // Additional user info profile not available via:

        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        // http://192.168.0.220:5002/auth/verification/action?mode=signIn&lang=en&oobCode=kjQ4SFm7DbheHU9oID9qW87_musf5suXkGbS_Ha94fPCJ7siAPaZFO&apiKey=fake-api-key&continueUrl=http%3A%2F%2F192.168.0.220%3A5002
        // http://127.0.0.1:9099/emulator/action?mode=signIn&lang=en&oobCode=kjQ4SFm7DbheHU9oID9qW87_musf5suXkGbS_Ha94fPCJ7siAPaZFO&apiKey=fake-api-key&continueUrl=http%3A%2F%2F192.168.0.220%3A5002

        dispatch({ type: 'END_LOADING' });
        dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'success',
            message: 'Your password has been secured. Your account is all setup! You can view your account specifics top right',
            duration: 12000,
          },
        });
        router.push('/');
      } catch (error) {
        console.log(error.message, error);
        dispatch({ type: 'MODAL', payload: { ...modal, open: false } });

        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'error',
            message: `Authentication error: ${error.code}. Your email link seems to have expired. Please re-start the process!`,
            duration: 8000,
          },
        });
        router.push('/auth/login-cover/');
      }
    } catch (error) {
      console.log(error.message);

      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'error',
          message: error.message,
          duration: 5000,
        },
      });
    }

    dispatch({ type: 'END_LOADING' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {!emailSaved && (
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <DialogContentText>It appears you are using a different device or browser to complete the signin process. For security reasons we need to confirm your email again.</DialogContentText>
          <TextField sx={{ my: 2 }} size="small" inputRef={emailRef} error={emailError} label="Email" />
          {/* <DialogContentText>Confirm new password:</DialogContentText> */}
        </DialogContent>
      )}
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* <DialogContentText>New password:</DialogContentText> */}
        <PasswordField sx={{ my: 2 }} size="small" inputRef={passwordRef} error={pwordError} label="New Password" />
        {/* <DialogContentText>Confirm new password:</DialogContentText> */}
        <PasswordField size="small" inputRef={confirmPasswordRef} error={pwordError} label="Confirm Password" />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button type="submit" sx={{ borderRadius: 25 }} variant="contained" endIcon={<Iconify icon="carbon:send" />}>
          Submit
        </Button>
      </DialogActions>
    </form>
  );
};
export default EmailSignInSetPassword;
