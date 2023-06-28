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
    name: Yup.string().required('First name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    birthday: Yup.string(),
    // gender: Yup.string().required('Gender is required'),
    streetAddress: Yup.string(),
    city: Yup.string(),
    postCode: Yup.string(),
  });

  const { name, email, address } = productsTable.length ? productsTable[0].billing_details : { name: '', email: '', address: {} };
  const { phone } = productsTable.length ? productsTable[0]?.customer_details || '' : '';

  console.log(productsTable);
  console.log(name, email, address, phone);

  const defaultValues = {
    name: name || currentUser?.displayName || '',
    emailAddress: email || currentUser?.email || '',
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
  console.log(address);

  return (
    <AccountLayout>
      <Container>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Billing Details
        </Typography>
        <Box
          sx={{
            mb: 4,
            rowGap: 2.5,
            columnGap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          <OverviewItem icon="carbon:user" label="Name on card" text={name || currentUser?.displayName} />
          <OverviewItem icon="carbon:mobile" label="Phone Number" text={phone || ''} />
          <OverviewItem icon="carbon:email" label="Email" text={email} />
          <OverviewItem icon="carbon:location" label="Location" text={address.country} />
          {/* <OverviewItem icon="carbon:time" label="Durations" text={email} />
          <OverviewItem icon="carbon:receipt" label="Languages" text={email} /> */}
        </Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h3" sx={{ mb: 0 }}>
            Personal Details
          </Typography>
          <Typography sx={{ pb: 3 }}>Certain fields must remain as per billing information</Typography>
          <Box rowGap={2.5} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
            <RHFTextField name="name" label="Name" />

            <RHFTextField name="emailAddress" label="Email Address" disabled={!!productsTable.length} />

            <RHFTextField name="phoneNumber" label="Phone Number" disabled={!!productsTable.length} />

            <RHFTextField name="streetAddress" label="Street Address" />

            <RHFTextField name="city" label="City" />
            <RHFTextField name="state" label="State" />
            <RHFTextField name="postCode" label="Post Code" />

            <RHFTextField name="country" label="Country" disabled={!!productsTable.length} />

            {/* <RHFSelect native name="country" label="Country">
              <option value="" />
              {countries.map((country) => (
                <option key={country.code} value={country.label}>
                  {country.label}
                </option>
              ))}
            </RHFSelect> */}
          </Box>
          <Typography paragraph variant="h5" sx={{ my: 3 }}>
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

          <LoadingButton sx={{ my: 6 }} color="primary" size="large" type="submit" variant="contained" loading={isSubmitting}>
            Update Personal Details
          </LoadingButton>
        </FormProvider>
      </Container>
    </AccountLayout>
  );
}

function OverviewItem({ icon, label, text = '-' }) {
  return (
    <Stack spacing={1.5} direction="row" alignItems="flex-start">
      <Iconify icon={icon} width={24} />
      <Stack spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        <Typography>{text}</Typography>
      </Stack>
    </Stack>
  );
}

// OverviewItem.propTypes = {
//   icon: PropTypes.node,
//   label: PropTypes.string,
//   text: PropTypes.string,
// };
