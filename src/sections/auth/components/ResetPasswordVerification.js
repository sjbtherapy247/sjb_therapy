import { Button, DialogActions, DialogContent } from '@mui/material';
import { useRef, useState } from 'react';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from 'src/lib/createFirebaseApp';
import { useSettingsContext } from 'src/components/settings';
import { useRouter } from 'next/router';
import Iconify from 'src/components/iconify/Iconify';
import PasswordField from './PasswordField';

const ResetPasswordVerification = ({ oobCode }) => {
  const router = useRouter();

  const {
    dispatch,
    state: { alert, modal },
  } = useSettingsContext();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [pwordError, setPwordError] = useState(false);

  // eg. ?mode=resetPassword&oobCode=Lm7KiYbREzAJqAOCkN6CBnyhd5ALHANZpzrwnOZkUPgAAAGFq6_Jmw&apiKey=AIzaSyBz4ew-AmtQGL0h6DNYJKhniipIK7eFBUM&lang=en

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    try {
      // password error boundary

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
        // oobCode error boundary
        await confirmPasswordReset(auth, oobCode, password);
        dispatch({ type: 'END_LOADING' });
        dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'success',
            message: 'Your password has been updated. You are go to !',
            duration: 10000,
          },
        });
        router.push('/auth/login-cover');
      } catch (error) {
        console.log(error.message, error);
        dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            ...alert,
            open: true,
            severity: 'error',
            message: `SCC authentication error: ${error.code}. Your email link seems to have expired. Please re-start the recovery process!`,
            duration: 10000,
          },
        });
        router.push('/auth/login-cover');
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
export default ResetPasswordVerification;
