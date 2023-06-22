import { Button, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import { useRef } from 'react';
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify/Iconify';

const ResetPassword = () => {
  const {
    dispatch,
    state: { alert, modal },
  } = useSettingsContext();
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'START_LOADING' });
    try {
      // await resetPassword(emailRef.current.value);
      console.log('Reset password email sent!');
      // close the modal
      dispatch({ type: 'MODAL', payload: { ...modal, open: false } });

      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'success',
          message: 'Reset password link sent to your inbox, please check your email',
          duration: 6000,
        },
      });
    } catch (error) {
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
    }
    dispatch({ type: 'END_LOADING' });
  };
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent sx={{ minWidth: 350 }}>
        <TextField color="info" size="small" fullWidth inputRef={emailRef} label="Email" />
        <DialogContentText mt={1}>Please confirm email address for password reset</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button type="submit" sx={{ mb: 2, borderRadius: 25 }} variant="contained" endIcon={<Iconify icon="carbon:send" />}>
          Send
        </Button>
      </DialogActions>
    </form>
  );
};
export default ResetPassword;
