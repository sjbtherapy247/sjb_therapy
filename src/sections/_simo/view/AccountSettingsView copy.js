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
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
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

  const AccountPersonalSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length'),
    password: Yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], "Password's do not match")
      .min(8, 'Password should be of minimum 8 characters length'),
  });

  // password: Yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length'),
  // confirmPassword: Yup.string()
  //   .required('Confirm password is required')
  //   .oneOf([Yup.ref('password')], "Password's do not match"),

  const defaultValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(AccountPersonalSchema),
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

    // try {
    //   try {
    //     const credential = EmailAuthProvider.credential(user?.email, data.oldPassword);
    //     await reauthenticateWithCredential(user, credential);
    //   } catch (error) {
    //     dispatch({ type: 'END_LOADING' });

    //     console.log(error.message);
    //     dispatch({
    //       type: 'UPDATE_ALERT',
    //       payload: { ...alert, open: true, severity: 'error', message: 'Current password invalid, please check your details and try again.', duration: 4000 },
    //     });
    //   }
    //   reset();
    // } catch (error) {
    //   console.error(error.message, error);
    //   dispatch({
    //     type: 'UPDATE_ALERT',
    //     payload: { ...alert, open: true, severity: 'error', message: 'There seems to be a problem reaching the authtentication services. Please check your network', duration: 4000 },
    //   });
    // }
    dispatch({ type: 'END_LOADING' });
  };

  return (
    <AccountLayout>
      <Container>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h3" sx={{ mb: 3 }}>
            Account Settings
          </Typography>

          <Stack spacing={3} sx={{ my: 5 }}>
            <Typography variant="h5"> Change Password </Typography>

            <Stack spacing={2.5}>
              <RHFTextField
                name="oldPassword"
                label="Old Password"
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

              <RHFTextField
                name="password"
                label="New Password"
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

              <RHFTextField
                name="confirmPassword"
                label="Confirm New Password"
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
            </Stack>
          </Stack>

          <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
          <LoadingButton sx={{ my: 6 }} color="primary" size="large" type="submit" variant="contained" loading={isSubmitting}>
            Change Password
          </LoadingButton>
        </FormProvider>
      </Container>
    </AccountLayout>
  );
}
