import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Link,
  Stack,
  // Button,
  AppBar,
  Toolbar,
  // Container,
  Tooltip,
  IconButton,
} from '@mui/material';
// hooks
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
import { useSettingsContext } from 'src/components/settings/SettingsContext';
// utils
// import { bgBlur } from 'src/utils/cssStyles';
// routes
// import { paths } from 'src/routes/paths';
// config
import { HEADER } from 'src/config-global';
// components
// import Logo from 'src/components/logo';
// import Label from 'src/components/label';
//
import Image from 'src/components/image/Image';
import Iconify from 'src/components/iconify/Iconify';
// Icons
// import'mdi:loginIcon'from '@iconify/icons-mdi/login';
// import brightness7 from '@iconify/icons-mdi/brightness-7';
// import brightness2 from '@iconify/icons-mdi/brightness-2';

import { bgBlur } from 'src/utils/cssStyles';
import { NavMobile, NavDesktop, navConfig } from '../nav';

// ----------------------------------------------------------------------

export default function Header({ headerOnDark }) {
  const theme = useTheme();
  const { onToggleMode } = useSettingsContext();
  console.log(theme);

  const isMdUp = useResponsive('up', 'md');

  const isOffset = useOffSetTop(4);

  return (
    <AppBar color="transparent" sx={{ boxShadow: 'none', width: '100vw' }}>
      <Toolbar
        disableGutters
        sx={{
          display: 'block',
          height: {
            xs: HEADER.H_MOBILE,
            // md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: '1s',
            // duration: theme.transitions.duration.shorter,
          }),

          ...(isOffset && {
            ...{ backgroundColor: theme.palette.primary.dark },
            // ...bgBlur({ color: theme.palette.primary.darker, blur: 6 }),
            // ...bgBlur({ color: theme.palette.background.default, blur: 5 }),
            // color: 'text.primary',
            color: 'common.white',
            // height: {
            //   md: HEADER.H_MAIN_DESKTOP,
            // },
          }),
          ...(!isOffset && {
            // ...{ backgroundColor: theme.palette.primary.dark },
            ...bgBlur({ color: theme.palette.primary.darker, blur: 7, opacity: 0.1 }),
            // ...bgBlur({ color: theme.palette.background.default, blur: 5 }),
            // color: 'text.primary',
            // height: {
            //   md: HEADER.H_MAIN_DESKTOP,
            // },
          }),
          ...(!isMdUp && {
            ...{ backgroundColor: theme.palette.primary.dark },
            color: 'common.white',
          }),
        }}
      >
        <Box sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Link href="/" component={NextLink}>
            <Tooltip arrow placement="bottom" title="home" enterDelay={1000}>
              <Box sx={{ lineHeight: 0, position: 'relative', height: '64px', width: '185.44px' }}>
                <Image src="/assets/sjb-logo/hnav-logo.jpg" disabledEffect sx={{ height: 1 }} />
              </Box>
            </Tooltip>
          </Link>
          {isMdUp && <NavDesktop data={navConfig} />}

          <Stack
            spacing={2}
            flexGrow={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Stack spacing={1} direction="row" alignItems="center" sx={{ pr: { xs: 0, md: 2 } }}>
              <Tooltip
                title={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                arrow
                placement="bottom-end"
              >
                <IconButton onClick={onToggleMode} color="inherit">
                  {theme.palette.mode === 'dark' ? (
                    <Iconify icon="mdi:brightness-7" />
                  ) : (
                    <Iconify icon="mdi:brightness-2" />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Sign in" arrow placement="bottom">
                <Link
                  component={NextLink}
                  href="/auth/login-cover"
                  underline="none"
                  color="inherit"
                >
                  <IconButton color="inherit" aria-label="search">
                    <Iconify icon="mdi:login" />
                  </IconButton>
                </Link>
              </Tooltip>
            </Stack>
          </Stack>

          {!isMdUp && <NavMobile data={navConfig} />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
