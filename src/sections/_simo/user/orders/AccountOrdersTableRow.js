import PropTypes from 'prop-types';
import { useState } from 'react';
import NextLink from 'next/link';
// @mui
import { Popover, Divider, TableRow, Checkbox, MenuItem, TableCell, IconButton, InputBase, Typography, Link } from '@mui/material';
//  utils
import { fDate } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function AccountOrdersTableRow({ row, onSelectRow, selected }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const inputStyles = {
    pl: 1,
    '&.Mui-focused': {
      bgcolor: 'action.selected',
    },
  };

  return (
    <>
      <TableRow hover selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox color="primary" checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        <TableCell sx={{ px: 1 }}>
          <Typography variant="body2" sx={inputStyles}>
            {row.data.object.payment_intent.slice(-7).toUpperCase()}
          </Typography>{' '}
        </TableCell>

        <TableCell sx={{ px: 1 }}>
          <Typography variant="body2" sx={inputStyles}>
            {row.data.object?.line_items?.description || 'Session'}
          </Typography>
          {/* <InputBase value={row.item} sx={inputStyles} /> */}
        </TableCell>

        {/* <TableCell>{new Date(row.created * 1000).toISOString()}</TableCell> */}
        <TableCell>{fDate(new Date(row.created * 1000).toISOString(), 'dd/MM/yyyy p')}</TableCell>

        <TableCell sx={{ px: 1 }}>
          {/* <InputBase value={fCurrency(row.price)} sx={inputStyles} /> */}
          <Typography variant="body2" sx={inputStyles}>
            {fCurrency(row.data.object.amount / 100)}
          </Typography>
        </TableCell>

        <TableCell>
          <Label color={(row.status === 'Completed' && 'success') || (row.status === 'To Process' && 'warning') || (row.status === 'Cancelled' && 'error') || 'default'}>{row.status}</Label>
        </TableCell>

        <TableCell align="right" padding="none">
          <IconButton onClick={handleOpen}>
            <Iconify icon="carbon:overflow-menu-vertical" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { p: 1, width: 160 },
        }}
      >
        <Link underline="none" target="_blank" component={NextLink} href={row.data.object.receipt_url}>
          <MenuItem onClick={handleClose}>
            <Iconify icon="carbon:document" sx={{ mr: 10 }} />
            <Typography variant="body2" sx={{ pl: 1 }}>
              View Receipt
            </Typography>
          </MenuItem>
        </Link>

        {/* <MenuItem onClick={handleClose}>
          <Iconify icon="carbon:edit" sx={{ mr: 1 }} /> Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', mt: 0.5 }} />

        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
          <Iconify icon="carbon:trash-can" sx={{ mr: 1 }} /> Delete
        </MenuItem> */}
      </Popover>
    </>
  );
}

AccountOrdersTableRow.propTypes = {
  onSelectRow: PropTypes.func,
  row: PropTypes.shape({
    deliveryDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
    item: PropTypes.string,
    orderId: PropTypes.string,
    price: PropTypes.number,
    status: PropTypes.string,
  }),
  selected: PropTypes.bool,
};
