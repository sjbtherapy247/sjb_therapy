import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
// fb
import { db } from 'src/lib/createFirebaseApp';
import { ref, update } from 'firebase/database';
// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import enAU from 'date-fns/locale/en-AU';

import { Box, Typography, Stack, Container } from '@mui/material';
// assets
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
  const {
    custId,
    client,
    dispatch,
    state: { alert },
  } = useSettingsContext();

  const AccountPersonalSchema = Yup.object().shape({
    name: Yup.string(),
    emailAddress: Yup.string(),
    phoneNumber: Yup.string(),
    birthday: Yup.string(),
    gender: Yup.string().required('Gender is required'),
    streetAddress: Yup.string().required('Required to update your address'),
    city: Yup.string().required('Required to update your address'),
    state: Yup.string().required('Required to update your address'),
    postCode: Yup.string().required('Required to update your address'),
    country: Yup.string(),
  });

  const { name = '', email = '', phone = '', address = {} } = client;
  // const { phone } = productsTable.length ? productsTable[0]?.customer_details || '' : '';

  const defaultValues = {
    fname: '',
    emailAddress: '',
    phoneNumber: '',
    birthday: null,
    gender: 'female',
    streetAddress: '',
    city: '',
    state: '',
    postCode: '',
    country: 'AU',
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

  useEffect(() => {
    if (!client) return;
    const personal = client?.acct_per_details;
    const resetValues = {
      fname: personal?.fname || name,
      emailAddress: email || '',
      phoneNumber: phone || '',
      birthday: new Date(personal?.birthday) || new Date(),
      gender: personal?.gender || 'female',
      streetAddress: personal?.streetAddress || address?.line1 || '',
      city: personal?.city || address?.city || '',
      state: personal?.state || address?.state || '',
      postCode: personal?.postCode || address?.postal_code || '',
      country: address?.country || 'AU',
    };
    reset(resetValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const onSubmit = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      console.log('DATA', data);
      await update(ref(db, `customers/${custId}/acct_per_details`), data);
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          ...alert,
          open: true,
          severity: 'success',
          message: 'Your details have been updated.',
          duration: 1000,
          posn: 'center',
        },
      });
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
          <Typography sx={{ pb: 3 }}>Certain fields must remain as per billing information</Typography>
          <Box rowGap={2.5} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}>
            <RHFTextField name="fname" label="Name" />

            <RHFTextField name="emailAddress" label="Email Address" disabled />

            <RHFTextField name="phoneNumber" label="Phone Number" disabled />

            <RHFTextField name="streetAddress" label="Street Address" />

            <RHFTextField name="city" label="City" />
            <RHFTextField name="state" label="State" />
            <RHFTextField name="postCode" label="Post Code" />

            <RHFTextField name="country" label="Country" disabled />

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
          <Box rowGap={2.5} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}>
            {/* wrap date picker in en-AU locale for date formatting */}
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enAU}>
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
            </LocalizationProvider>

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
