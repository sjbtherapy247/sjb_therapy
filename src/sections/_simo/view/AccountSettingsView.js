import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
// import { add } from 'date-fns';

import { useState } from 'react';
// @mui
import { Divider, Typography, InputAdornment, Stack, IconButton, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';

//
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useSettingsContext } from 'src/components/settings';
import { AccountLayout } from '../layout';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountSettingsView() {
  const {
    user,
    dispatch,
    state: { alert },
  } = useSettingsContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const ResetPwSchema = Yup.object().shape({
    original: Yup.string().required('Current password required'),
    // email: Yup.string().required('Email is required').email('Invalid email format'),
    // mobile: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], "Password's do not match"),
  });
  const defaultValues = {
    original: '',
    password: '',
    confirmPassword: '',
  };
  const methods = useForm({
    resolver: yupResolver(ResetPwSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    dispatch({ type: 'START_LOADING' });
    console.log('DATA', data);

    try {
      try {
        const credential = EmailAuthProvider.credential(user?.email, data.original);
        await reauthenticateWithCredential(user, credential);
        console.log('reauth success');
      } catch (error) {
        dispatch({ type: 'END_LOADING' });

        console.log(error.message);
        dispatch({
          type: 'UPDATE_ALERT',
          payload: { ...alert, open: true, severity: 'error', message: 'Current password invalid, please check your details and try again.', duration: 4000 },
        });
      }
      await updatePassword(user, data.password);
    } catch (error) {
      console.error(error.message, error);
      dispatch({ type: 'END_LOADING' });
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, open: true, severity: 'error', message: 'There seems to be a problem reaching the authtentication services. Please check your network', duration: 4000 },
      });
    }
    // success password updated - reset the form
    reset();
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { ...alert, open: true, severity: 'success', message: 'Your password has been updated. Good to go!', duration: 4000 },
    });
    dispatch({ type: 'END_LOADING' });
  };
  // const onSubmit = async (data) => {
  //   // dispatch({ type: 'START_LOADING' });
  //   // window.localStorage.setItem('emailForSignIn', data?.email);
  //   // try {
  //   //   const user = await fetch('/api/email/send', {
  //   //     method: 'POST',
  //   //     headers: {
  //   //       'Content-Type': 'application/json',
  //   //     },
  //   //     body: JSON.stringify({
  //   //       currentUserEmail: data.email,
  //   //       // newUserEmail: data.email,
  //   //       mode: 'isClient',
  //   //       // test: 'true',
  //   //     }),
  //   //   }).then((res) => res.json());
  //   //   // if the account already existing throw a wobbler
  //   //   if (user.uid) throw new Error('Error - It appears there is already an account on our system with that email address.');
  //   //   console.log(user);
  //   //   // await new Promise((resolve) => setTimeout(resolve, 500));
  //   //   const response = await fetch('/api/email/send', {
  //   //     method: 'POST',
  //   //     headers: {
  //   //       'Content-Type': 'application/json',
  //   //     },
  //   //     body: JSON.stringify({
  //   //       currentUserEmail: data.email,
  //   //       // newUserEmail: data.email,
  //   //       mode: 'signInWithEmail',
  //   //       // test: 'true',
  //   //     }),
  //   //   });
  //   //   const resJson = await response.json();
  //   // console.log(resJson);
  //   // router.push('/');

  //   // reset();
  //   console.log('DATA', data);
  //   //   dispatch({
  //   //     type: 'UPDATE_ALERT',
  //   //     payload: {
  //   //       ...alert,
  //   //       open: true,
  //   //       severity: 'success',
  //   //       message: `An account verification email has been sent to ${data.email}. To complete the account registration process please follow the instructions in your email.`,
  //   //       duration: 12000,
  //   //     },
  //   //   });

  //   //   dispatch({ type: 'END_LOADING' });
  //   // } catch (error) {
  //   //   console.error(error);
  //   //   router.push('/');
  //   //   dispatch({ type: 'END_LOADING' });
  //   //   dispatch({
  //   //     type: 'UPDATE_ALERT',
  //   //     payload: {
  //   //       ...alert,
  //   //       open: true,
  //   //       severity: 'error',
  //   //       message: `An account with email ${data.email} already exists. To recover your account please use the 'Forgot password?' on the Client Login page`,
  //   //       duration: 12000,
  //   //     },
  //   //   });
  //   // }
  // };

  return (
    <AccountLayout>
      <Container>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h3" sx={{ mb: 3 }}>
            Account Settings
          </Typography>
          <Stack spacing={3} sx={{ my: 4 }}>
            <Typography variant="h5"> Change Password </Typography>

            <RHFTextField
              name="original"
              label="Password ->"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="password"
              label="New Password -"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="confirmPassword"
              label="Confirm Password -"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Divider sx={{ borderStyle: 'dashed' }} />

            <LoadingButton fullWidth color="primary" size="large" type="submit" variant="contained" loading={isSubmitting}>
              Change Password
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </AccountLayout>
  );
}
