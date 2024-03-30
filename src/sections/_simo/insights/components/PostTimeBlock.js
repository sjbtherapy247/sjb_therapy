import PropTypes from 'prop-types';
// @mui
import { Stack, Box } from '@mui/material';
// utils
import { fDate } from 'src/utils/formatTime';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function PostTimeBlock({ createdAt, duration, sx, ...other }) {
  const [clientsideDate, setClientsideDate] = useState(null);

  useEffect(() => {
    setClientsideDate(fDate(createdAt));
  }, [createdAt]);

  return (
    <Stack 
      flexWrap="wrap" 
      direction="row" 
      alignItems="center" 
      sx={{ typography: 'caption', color: 'text.disabled', ...sx }} 
      {...other}
      >

      {duration && (
        <>
          {duration}
          <Box
            component="span"
            sx={{
              mx: 1,
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: 'currentColor',
            }}
          />
        </>
      )}
      {clientsideDate}
    </Stack>
  );
}

PostTimeBlock.propTypes = {
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  duration: PropTypes.string,
  sx: PropTypes.object,
};
