import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
// next
import { useRouter } from 'next/router';
import NextLink from 'next/link';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Link, IconButton, InputAdornment } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
//
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/lib/createFirebaseApp';
// import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

// ----------------------------------------------------------------------

export default function AuthLoginForm() {
  const {
    state: { alert },
    dispatch,
  } = useSettingsContext();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('That is not an email'),
    password: Yup.string().required('Password is required').min(6, 'Password should be of minimum 6 characters length'),
  });
  const defaultValues = {
    email: '',
    password: '',
  };
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const userDoc = await signInWithEmailAndPassword(auth, data.email, data.password);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'success',
          message: 'Login Successful - Welcome back!',
          duration: 3000,
        },
      });
      // console.log(userDoc);
      // reset();
      // router.push('/account/orders/');
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'error',
          message: `Login failed. Please check your details are correct. To recover a lost password please use 'Forgot password?`,
          duration: 10000,
        },
      });
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1.5} alignItems="flex-end">
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Link component={NextLink} href={paths.resetPassword} variant="body2" underline="always" color="text.secondary">
          Forgot password?
        </Link>

        <LoadingButton fullWidth color="primary" size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
