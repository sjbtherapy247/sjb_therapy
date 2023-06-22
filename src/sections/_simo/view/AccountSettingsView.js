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
import { AccountLayout } from '../layout';

// ----------------------------------------------------------------------

const TABS = ['All Vouchers', 'Latest', 'Popular', 'Expiring'];

// ----------------------------------------------------------------------

export default function AccountSettingsView() {
  // const [tab, setTab] = useState('All Vouchers');

  // const handleChangeTab = (event, newValue) => {
  //   setTab(newValue);
  // };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const AccountPersonalSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length'),
    newPassword: Yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length'),
    confirmNewPassword: Yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
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
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
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
                name="newPassword"
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
                name="confirmNewPassword"
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

          {/* <Tabs value={tab} scrollButtons="auto" variant="scrollable" allowScrollButtonsMobile onChange={handleChangeTab} sx={{ mb: 3 }}>
        {TABS.map((category) => (
          <Tab key={category} value={category} label={category} />
        ))}
      </Tabs> */}
        </FormProvider>
      </Container>
    </AccountLayout>
  );
}
