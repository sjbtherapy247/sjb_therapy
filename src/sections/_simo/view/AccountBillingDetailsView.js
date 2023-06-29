// @mui
import { Box, Typography, Stack, Container } from '@mui/material';
// assets
// components
import Iconify from 'src/components/iconify';
//
import { useSettingsContext } from 'src/components/settings';

import { AccountLayout } from '../layout';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPersonalView() {
  const { user, productsTable, custId, client } = useSettingsContext();

  const { name, email, address } = productsTable.length ? productsTable[0].billing_details : { name: '', email: '', address: {} };

  console.log(productsTable);
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
          <OverviewItem icon="carbon:user" label="Name on card" text={client?.name || ''} />
          <OverviewItem icon="carbon:mobile" label="Phone Number" text={client?.phone || ''} />
          <OverviewItem icon="carbon:email" label="Email" text={client?.email || ''} />
          <OverviewItem icon="carbon:location" label="Location" text={address.country} />
          <OverviewItem icon="carbon:time" label="Card" text={productsTable[0]?.payment_method_details?.card?.brand.toUpperCase()} />
          <OverviewItem icon="carbon:document" label="Card ending" text={productsTable[0]?.payment_method_details?.card?.last4} />
          <OverviewItem icon="carbon:time" label="Client ID" text={client.id} />
          <OverviewItem icon="carbon:document" label="Invoice Prefix" text={client.invoice_prefix} />
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
