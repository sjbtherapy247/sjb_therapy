import PropTypes from 'prop-types';
// @mui
import { Card, Link, Stack, Button, Divider, Typography } from '@mui/material';
import NextLink from 'next/link';

// types
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import Label from 'src/components/label';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

export default function PlanCard({ plan }) {
  const { license, commons, options, icons, price } = plan;
  const theme = useTheme();

  const popular = license === '3-Session Bundle';

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
          <Typography variant="h5" component="div" sx={{ textTransform: 'uppercase', position: 'absolute', top: 70, left: 32, zIndex: 9 }}>
            {license}
          </Typography>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="h4" component="span">
              $
            </Typography>
            <Typography variant="h3" component="span">
              {price}
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

        <Stack alignItems="flex-end" spacing={3}>
          <Button size="large" fullWidth variant="contained" color="primary" target="_blank" rel="noopener" href={paths.zoneStore}>
            Choose Package
          </Button>

          <Link
            component={NextLink}
            color="text.secondary"
            // target="_blank"
            // rel="noopener"
            variant="body2"
            href="#servicesInclude"
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
