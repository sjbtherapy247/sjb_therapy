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
import { Box, Typography, Stack, Container } from '@mui/material';
// assets
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
//
import { useSettingsContext } from 'src/components/settings';

import { AccountLayout } from '../layout';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  const { user, productsTable, custId, client } = useSettingsContext();

  const { name, email, address } = productsTable.length ? productsTable[0].billing_details : { name: '', email: '', address: {} };
  const { phone } = productsTable.length ? productsTable[0]?.customer_details || '' : '';

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
          <OverviewItem icon="carbon:user" label="Name on card" text={name || user?.displayName} />
          <OverviewItem icon="carbon:mobile" label="Phone Number" text={phone || ''} />
          <OverviewItem icon="carbon:email" label="Email" text={email} />
          <OverviewItem icon="carbon:location" label="Location" text={address.country} />
          {/* <OverviewItem icon="carbon:time" label="Durations" text={email} />
          <OverviewItem icon="carbon:receipt" label="Languages" text={email} /> */}
        </Box>
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
