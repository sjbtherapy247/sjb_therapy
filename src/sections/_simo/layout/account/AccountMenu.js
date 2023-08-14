// import PropTypes from 'prop-types';
// // next
// import NextLink from 'next/link';
// // @mui
// import { alpha } from '@mui/material/styles';
import { Stack } from '@mui/material';
// import { Link, Stack, Drawer, Avatar, Divider, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// import useActiveLink from 'src/hooks/useActiveLink';
// // config
// import { NAV } from 'src/config-global';
// // routes
// import { paths } from 'src/routes/paths';
// // _mock
// import _mock from 'src/_mock';
// // components
// import Iconify from 'src/components/iconify';
// import TextMaxLine from 'src/components/text-max-line';

import { MenuContent } from 'src/layouts/main/AccountMenu';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountMenu() {
  const isMdUp = useResponsive('up', 'md');

  return <Stack sx={{ width: 220 }}>{isMdUp && <MenuContent />}</Stack>;
}

// ----------------------------------------------------------------------
