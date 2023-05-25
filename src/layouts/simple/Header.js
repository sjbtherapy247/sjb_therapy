import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Link, Stack, Tooltip, IconButton } from '@mui/material';
// config
import { HEADER } from 'src/config-global';
// utils
// import { bgBlur } from 'src/utils/cssStyles';
// routes
import { paths } from 'src/routes/paths';
// components
// import Logo from 'src/components/logo';
// import SettingsDrawer from 'src/components/settings/drawer';
import { Box } from '@mui/system';
import Image from 'src/components/image/Image';
// icons
// import chatQuestionOutline from '@iconify/icons-mdi/chat-question-outline';
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function Header({ isOffset }) {
  const theme = useTheme();
  console.log(theme);

  return (
    <AppBar color="transparent" sx={{ boxShadow: 'none', width: '100vw' }}>
      <Toolbar
        disableGutters
        sx={{
          // justifyContent: 'space-between',
          display: 'block',
          color: 'common.white',
          backgroundColor: theme.palette.primary.dark,
          height: {
            xs: HEADER.H_MOBILE,
            // md: HEADER.H_MAIN_DESKTOP,
          },
          // transition: theme.transitions.create(['height', 'background-color'], {
          //   easing: theme.transitions.easing.easeInOut,
          //   duration: theme.transitions.duration.shorter,
          // }),
          // ...(isOffset && {
          //   ...bgBlur({ color: theme.palette.background.default }),
          //   height: {
          //     md: HEADER.H_MAIN_DESKTOP - 16,
          //   },
          // }),
        }}
      >
        <Box sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Link href="/" component={NextLink}>
              <Tooltip arrow placement="bottom" title="home" enterDelay={1000}>
                <Box sx={{ lineHeight: 0, position: 'relative', height: '64px', width: '185.44px' }}>
                  <Image src="/assets/sjb-logo/hnav-logo.jpg" alt="go to home page" disabledEffect sx={{ height: 1 }} />
                </Box>
              </Tooltip>
            </Link>
          </Box>

          <Stack sx={{ mr: 1 }} spacing={1} direction="row" alignItems="center" flexGrow={1} justifyContent="flex-end">
            <Link href={paths.support} component={NextLink} color="inherit">
              <IconButton color="inherit">
                <Iconify icon="carbon:help" />
              </IconButton>
            </Link>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  isOffset: PropTypes.bool,
};
