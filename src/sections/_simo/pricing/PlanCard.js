import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Stack, Button, Divider, Typography, CircularProgress } from '@mui/material';
import NextLink from 'next/link';

// types
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useTheme } from '@emotion/react';
// lib
import { checkout } from 'src/lib/checkout';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function PlanCard({ plan, prices }) {
  const { stripeName, license, commons, options, price } = plan;
  const theme = useTheme();
  const { custId, user } = useSettingsContext();

  const [loading, setLoading] = useState(false);

  const popular = license === '3-Session Bundle';
  let purchase = null;
  let itemPrice = null;

  if (prices && prices.length > 0) {
    purchase = prices.filter((item) => item?.product?.name === stripeName);
    
    // Check if purchase array is not empty
    if (purchase.length > 0) {
        if (license === 'Single Session' && !user) purchase.pop();
        if (license === 'Single Session' && user) purchase.shift();

        // Check if purchase array still has elements after potential modifications
        if (purchase.length > 0) {
            itemPrice = purchase[0].unit_amount / 100;
        } else {
            // Handle case where purchase array becomes empty after modifications
            console.error('No eligible purchase found after license check.');
        }
    } else {
        // Handle case where no purchase matches the filter
        console.error('No purchase matching stripeName found.');
    }
} else {
    // Handle case where prices array is either undefined or empty
    console.error('No prices available.');
}

  const handleCheckout = () => {
    setLoading(true);
    checkout(purchase, custId);
  };

  return (
    <Card
      sx={{
        p: 4,
        boxShadow: theme.customShadows.z24,
        ...(popular && {
          // py: 8,
          boxShadow: theme.customShadows.z24,
        }),
      }}
    >
      {popular && (
        <Label color="success" sx={{ position: 'absolute', top: 20, left: 20 }}>
          POPULAR
        </Label>
      )}

      <Stack spacing={3}>
        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="h5" component="div" sx={{ position: 'absolute', top: 70, left: 32 }}>
            {license}
          </Typography>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="h4" component="span">
              $
            </Typography>
            <Typography variant="h3" component="span">
              {itemPrice || price}
            </Typography>
          </Stack>
        </Stack>

        {/* {license === 'Standard' ? (
          <Image alt="standard" src={icons[0]} sx={{ width: 24, height: 24, color: 'primary' }} />
        ) : (
          <Stack direction="row" spacing={1.5}>
            {icons.map((icon) => (
              <Image key={icon} alt={icon} src={icon} sx={{ width: 24, height: 24 }} />
            ))}
          </Stack>
        )} */}

        <Stack spacing={2.5} sx={{ pt: 4 }}>
          {commons.map((option) => (
            <Stack key={option} spacing={1.5} direction="row" alignItems="center">
              <Box sx={{ minWidth: 20 }}>
                <Iconify icon="carbon:checkmark-outline" color={theme.palette.primary.main} sx={{ color: 'primary', width: 20, height: 20 }} />
              </Box>{' '}
              <Typography variant="body2">{option}</Typography>
            </Stack>
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />

          {options.map((option) => (
            <Stack key={option.title} spacing={1.5} direction="row" alignItems="center" sx={{ minWidth: 24 }}>
              <Box sx={{ minWidth: 20 }}>
                <Iconify icon="carbon:checkmark-outline" color={theme.palette.primary.main} sx={{ color: 'primary', width: 20, height: 20 }} />
              </Box>
              <Typography variant="body2">{option.title}</Typography>
            </Stack>
          ))}
        </Stack>
        {/* <Link component={NextLink} href="/"> */}
        <LoadingButton size="large" fullWidth loading={loading} variant="contained" color="primary" loadingIndicator={<CircularProgress color="primary" size={24} />} onClick={handleCheckout}>
          Choose Package
        </LoadingButton>
        {/* </Link> */}
        <Stack alignItems="flex-end" spacing={3}>
          <Link
            component={NextLink}
            color="text.secondary"
            // target="_blank"
            // rel="noopener"
            variant="body2"
            href="#hypnotherapyServices"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            Hypnotherapy Services
            <Iconify icon="carbon:chevron-right" width={16} sx={{ ml: 1 }} />
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}

PlanCard.propTypes = {
  plan: PropTypes.shape({
    commons: PropTypes.array,
    icons: PropTypes.array,
    license: PropTypes.string,
    options: PropTypes.array,
    price: PropTypes.string,
  }),
};
