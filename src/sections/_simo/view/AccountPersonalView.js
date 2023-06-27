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
  const { currentUser, productsTable } = useSettingsContext();
  console.log(currentUser);

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

  const { name, email, address } = productsTable.length ? productsTable[0].billing_details : { name: '', email: '', address: {} };
  const { phone } = productsTable.length ? productsTable[0]?.customer_details || '' : '';

  console.log(productsTable);
  console.log(name, email, address, phone);

  const defaultValues = {
    firstName: name.split(/[ ,]+/)[0] || currentUser?.displayName,
    lastName: name.indexOf(' ') >= 0 ? name.split(/[ ,]+/)[1] : '',
    emailAddress: email || currentUser?.email,
    phoneNumber: phone || currentUser?.phoneNumber || 'will update soon',
    birthday: null,
    gender: 'female',
    streetAddress: address?.line1 || '',
    postCode: address?.postal_code || '',
    city: address.city || '',
    state: address.state || '',
    country: address.country || 'AU',
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
          <Typography variant="h3" sx={{ mb: 0 }}>
            Personal Details
          </Typography>
          <Typography sx={{ pb: 3 }}>Based on your billing information</Typography>
          <Box rowGap={2.5} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
            <RHFTextField name="firstName" label="First Name" disabled={productsTable.length} />

            <RHFTextField color="primary" name="lastName" label="Last Name" disabled={productsTable.length} inputProps={{ style: { color: '#FFF' } }} />

            <RHFTextField name="emailAddress" label="Email Address" disabled={productsTable.length} />

            <RHFTextField name="phoneNumber" label="Phone Number" disabled={productsTable.length} />

            <RHFTextField name="streetAddress" label="Street Address" disabled={productsTable.length} />

            <RHFTextField name="city" label="City" disabled={productsTable.length} />
            <RHFTextField name="state" label="State" disabled={productsTable.length} />
            <RHFTextField name="postCode" label="Post Code" disabled={productsTable.length} />

            <RHFTextField name="country" label="Country" disabled={productsTable.length} />

            {/* <RHFSelect native name="country" label="Country">
              <option value="" />
              {countries.map((country) => (
                <option key={country.code} value={country.label}>
                  {country.label}
                </option>
              ))}
            </RHFSelect> */}
          </Box>
          <Typography paragraph fullWidth variant="h5" sx={{ my: 3 }}>
            Optional Details
          </Typography>
          <Box rowGap={2.5} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
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
          </Box>

          <LoadingButton sx={{ my: 6 }} color="primary" size="medium" type="submit" variant="contained" loading={isSubmitting}>
            Update Optional Details
          </LoadingButton>
        </FormProvider>
      </Container>
    </AccountLayout>
  );
}
