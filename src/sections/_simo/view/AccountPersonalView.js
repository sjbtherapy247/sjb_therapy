import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Typography, Stack, IconButton, InputAdornment, Container } from '@mui/material';
// assets
import { countries } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
//
import { useSettingsContext } from 'src/components/settings';

import { AccountLayout } from '../layout';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = ['Female', 'Male', 'Other'];

// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser } = useSettingsContext();
  console.log(currentUser);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const AccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    // birthday: Yup.string().required('Birthday is required'),
    // gender: Yup.string().required('Gender is required'),
    // streetAddress: Yup.string().required('Street address is required'),
    // city: Yup.string().required('City is required'),
    // postCode: Yup.string().required('Zip code is required'),
  });

  const defaultValues = {
    firstName: currentUser?.displayName || '',
    lastName: '',
    emailAddress: currentUser?.email,
    phoneNumber: currentUser?.phoneNumber || '',
    birthday: null,
    gender: 'female',
    streetAddress: '',
    postCode: '',
    city: '',
    country: 'Australia',
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
            Update Personal Details
          </Typography>

          <Box rowGap={2.5} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
            <RHFTextField name="firstName" label="First Name" />

            <RHFTextField name="lastName" label="Last Name" />

            <RHFTextField name="emailAddress" label="Email Address" />

            <RHFTextField name="phoneNumber" label="Phone Number" />

            <Controller
              name="birthday"
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="Birthday"
                  slotProps={{
                    textField: {
                      helperText: error?.message,
                      error: !!error?.message,
                    },
                  }}
                  {...field}
                  value={field.value}
                />
              )}
            />

            <RHFSelect native name="gender" label="Gender">
              {GENDER_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </RHFSelect>

            <RHFTextField name="streetAddress" label="Street Address" />

            <RHFTextField name="postCode" label="Post Code" />

            <RHFTextField name="city" label="City" />

            <RHFSelect native name="country" label="Country">
              <option value="" />
              {countries.map((country) => (
                <option key={country.code} value={country.label}>
                  {country.label}
                </option>
              ))}
            </RHFSelect>
          </Box>

          <LoadingButton sx={{ my: 6 }} color="primary" size="large" type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </FormProvider>
      </Container>
    </AccountLayout>
  );
}
