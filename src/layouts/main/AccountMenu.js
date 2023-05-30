import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { alpha } from '@mui/material/styles';
import { Link, Stack, Drawer, Avatar, Divider, ListItemIcon, ListItemText, ListItemButton, Menu } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import useActiveLink from 'src/hooks/useActiveLink';
// config
import { NAV } from 'src/config-global';
// routes
import { paths } from 'src/routes/paths';
// _mock
import _mock from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

const navigations = [
  {
    title: 'Personal Info',
    path: paths.eCommerce.account.personal,
    icon: <Iconify icon="carbon:user" />,
  },
  {
    title: 'Wishlist',
    path: paths.eCommerce.account.wishlist,
    icon: <Iconify icon="carbon:favorite" />,
  },
  {
    title: 'Vouchers',
    path: paths.eCommerce.account.vouchers,
    icon: <Iconify icon="carbon:cut-out" />,
  },
  {
    title: 'Orders',
    path: paths.eCommerce.account.orders,
    icon: <Iconify icon="carbon:document" />,
  },
  {
    title: 'Payment',
    path: paths.eCommerce.account.payment,
    icon: <Iconify icon="carbon:purchase" />,
  },
];

// ----------------------------------------------------------------------

export default function AccountMenu({ anchorElUser, handleCloseUserMenu }) {
  // const isMdUp = useResponsive('up', 'md');

  const menuContent = (
    <Stack
      sx={{
        flexShrink: 0,
        borderRadius: 2,
        width: 1,
      }}
    >
      <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar src={_mock.image.avatar(0)} sx={{ width: 64, height: 64 }} />
          <Stack direction="row" alignItems="center" sx={{ typography: 'caption', cursor: 'pointer', '&:hover': { opacity: 0.72 } }}>
            <Iconify icon="carbon:edit" sx={{ mr: 1 }} />
            Change photo
          </Stack>
        </Stack>

        <Stack spacing={0.5}>
          <TextMaxLine variant="subtitle1" line={1}>
            Jayvion Simon
          </TextMaxLine>
          {/* <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
            nannie_abernathy70@yahoo.com
          </TextMaxLine> */}
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        {navigations.map((item) => (
          <MenuItem key={item.title} item={item} />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 1 }}>
        <ListItemButton>
          <ListItemIcon>
            <Iconify icon="carbon:logout" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              typography: 'body2',
            }}
          />
        </ListItemButton>
      </Stack>
    </Stack>
  );

  return (
    <Menu
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!anchorElUser}
      onClick={handleCloseUserMenu}
    >
      {menuContent}
    </Menu>
  );
}

AccountMenu.propTypes = {
  handleCloseUserMenu: PropTypes.func,
  anchorElUser: PropTypes.node,
};

// ----------------------------------------------------------------------

function MenuItem({ item }) {
  const { active } = useActiveLink(item.path);

  return (
    <Link component={NextLink} key={item.title} href={item.path} color={active ? 'primary' : 'inherit'} underline="none">
      <ListItemButton
        sx={{
          px: 1,
          height: 44,
          borderRadius: 1,
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            typography: 'body2',
            ...(active && {
              typography: 'subtitle2',
            }),
          }}
        />
      </ListItemButton>
    </Link>
  );
}

MenuItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.node,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};
