import PropTypes from 'prop-types';
import { memo } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, Tooltip } from '@mui/material';
import Image from 'src/components/image/Image';

// ----------------------------------------------------------------------

function Logo({ single = false, sx }) {
  const theme = useTheme();

  const singleLogo = (
    <Box sx={{ lineHeight: 0, position: 'relative', height: 300 }}>
      <Image
        src={
          theme.palette.mode === 'light'
            ? '/assets/sjb-logo/sjb-loadingwhite.png'
            : '/assets/sjb-logo/sjb-loadingblack.png'
        }
        sx={{ height: 1 }}
        disabledEffect
      />
    </Box>
  );

  const fullLogo = (
    <Tooltip arrow placement="bottom" title="home" enterDelay={100}>
      <Box sx={{ lineHeight: 0, position: 'relative', height: '64px', width: '185.44px' }}>
        <Image src="/assets/sjb-logo/hnav-logo.jpg" disabledEffect sx={{ height: 1 }} />
      </Box>
    </Tooltip>
  );

  return (
    <Link
      component={NextLink}
      href="/"
      color="inherit"
      aria-label="go to homepage"
      sx={{ lineHeight: 0 }}
    >
      <Box
        sx={{
          // width: single ? 64 : 75,
          borderRadius: 3,
          overflow: 'hidden',
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          ...sx,
        }}
      >
        {single ? singleLogo : fullLogo}
      </Box>
    </Link>
  );
}

Logo.propTypes = {
  single: PropTypes.bool,
  sx: PropTypes.object,
};

export default memo(Logo);
