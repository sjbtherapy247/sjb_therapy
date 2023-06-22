import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
// @mui
import { LoadingButton } from '@mui/lab';
import { Typography, Stack, Link, IconButton, InputAdornment } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import { useRouter } from 'next/router';

// http://simo-dev.vercel.app/auth/verification/?mode=signIn&oobCode=5wnsIjvAj3XQX2SF2OQPTF1OmZbg1uBfvhRokTxMB6EAAAGI4pOKSA&apiKey=AIzaSyCGufgus2CDlS-4k3ITmQVZ4GdgzclH_no&continueUrl=https%3A%2F%2Fsimo-dev.vercel.app&lang=en
// ----------------------------------------------------------------------

export default function AuthRegisterForm() {
  const router = useRouter();

  const {
    dispatch,
    state: { alert },
  } = useSettingsContext();
  // const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required').min(8, 'Mininum 8 characters').max(15, 'Maximum 15 characters'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    mobile: Yup.string().required('Phone number is required'),
    // password: Yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length'),
    // confirmPassword: Yup.string()
    //   .required('Confirm password is required')
    //   .oneOf([Yup.ref('password')], "Password's do not match"),
  });
  const defaultValues = {
    fullName: '',
    email: '',
    mobile: '',
    // password: '',
    // confirmPassword: '',
  };
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    dispatch({ type: 'START_LOADING' });
    window.localStorage.setItem('emailForSignIn', data?.email);
    try {
      const user = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUserEmail: data.email,
          // newUserEmail: data.email,
          mode: 'isClient',
          // test: 'true',
        }),
      }).then((res) => res.json());
      // if the account already existing throw a wobbler
      if (user.uid) throw new Error('Error - It appears there is already an account on our system with that email address.');
      console.log(user);
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUserEmail: data.email,
          // newUserEmail: data.email,
          mode: 'signInWithEmail',
          // test: 'true',
        }),
      });
      const resJson = await response.json();
      console.log(resJson);
      router.push('/');

      reset();
      // console.log('DATA', data);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'success',
          message: `An account verification email has been sent to ${data.email}. To complete the account registration process please follow the instructions in your email.`,
          duration: 12000,
        },
      });

      dispatch({ type: 'END_LOADING' });
    } catch (error) {
      console.error(error);
      router.push('/');
      dispatch({ type: 'END_LOADING' });
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'error',
          message: `An account with email ${data.email} already exists. To recover your account please use the 'Forgot password?' on the Client Login page`,
          duration: 12000,
        },
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1.5}>
        <RHFTextField name="fullName" label="Full Name" />

        <RHFTextField name="email" label="Email address" />
        <RHFTextField name="mobile" label="Mobile" />

        {/* <RHFTextField
          name="password"
          label="Password"
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
          label="Confirm Password"
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
        /> */}

        <LoadingButton fullWidth color="primary" size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>

        <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
          {`I agree to `}
          <Link color="text.primary" href="#" underline="always">
            Terms of Service
          </Link>
          {` and `}
          <Link color="text.primary" href="#" underline="always">
            Privacy Policy.
          </Link>
        </Typography>
      </Stack>
    </FormProvider>
  );
}
