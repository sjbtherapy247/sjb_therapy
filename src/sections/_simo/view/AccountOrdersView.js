import { useEffect, useState } from 'react';
// fb
import { db } from 'src/lib/createFirebaseApp';
import { ref, onValue } from 'firebase/database';
// @mui
import { Box, Table, TableRow, TableBody, TableCell, Typography, TableContainer, TablePagination } from '@mui/material';
// _mock
// import { productsTable } from 'src/_mock';
// components
// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
//
// import { EcommerceAccountLayout } from '../layout';
import { stableSort, getComparator, AccountOrdersTableRow, AccountOrdersTableHead, AccountOrdersTableToolbar } from 'src/sections/_simo/user/orders';
import { useSettingsContext } from 'src/components/settings';
import { AccountLayout } from '../layout';

// ----------------------------------------------------------------------

// const TABS = ['All Orders', 'Completed', 'To Process', 'Cancelled', 'Return & Refund'];

export const TABLE_HEAD = [
  { id: 'orderId', label: 'Order ID', width: 115 },
  { id: 'item', label: 'Session Package' },
  { id: 'created', label: 'Purchase date', width: 180 },
  { id: 'price', label: 'Price', width: 60 },
  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 0 },
  // { id: 'viewReceipt', label: 'Receipt' },
];

// ----------------------------------------------------------------------

export default function AccountOrdersPage() {
  // const [tab, setTab] = useState('All Orders');
  const { productsTable } = useSettingsContext();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('created');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productsTable.length) : 0;

  return (
    <AccountLayout>
      <Typography variant="h3" sx={{ pl: 2, mb: 3 }}>
        Orders
      </Typography>

      <TableContainer
        sx={{
          overflow: 'unset',
          '& .MuiTableCell-head': {
            color: 'text.primary',
          },
          '& .MuiTableCell-root': {
            bgcolor: 'background.default',
            borderBottomColor: (theme) => theme.palette.divider,
          },
        }}
      >
        <Scrollbar>
          <Table
            sx={{
              minWidth: 720,
            }}
            size="medium"
          >
            <AccountOrdersTableHead order={order} orderBy={orderBy} onSort={handleSort} headCells={TABLE_HEAD} rowCount={productsTable.length} />

            <TableBody>
              {stableSort(productsTable, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <AccountOrdersTableRow key={row.id} row={row} selected={selected.includes(row.id)} />
                ))}

              {/* {emptyRows > 0 && (
                <TableRow
                  sx={{
                    height: 57 * emptyRows,
                  }}
                >
                  <TableCell colSpan={9} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Box sx={{ position: 'relative' }}>
        <TablePagination page={page} component="div" count={productsTable.length} rowsPerPage={rowsPerPage} onPageChange={handleChangePage} rowsPerPageOptions={[5, 10, 25]} onRowsPerPageChange={handleChangeRowsPerPage} />

        {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              sm: 'absolute',
            },
          }}
        /> */}
      </Box>
    </AccountLayout>
  );
}
