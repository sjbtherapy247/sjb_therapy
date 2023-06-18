import PropTypes from 'prop-types';
// @mui
import { Stack, Box } from '@mui/material';
// utils
import { fDate } from 'src/utils/formatTime';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function PostTimeBlock({ createdAt, duration, sx, ...other }) {
  let createClientDate = null;
  useEffect(() => {
    createClientDate = fDate(createdAt);
  }, [createdAt]);

  return (
    <Stack flexWrap="wrap" direction="row" alignItems="center" sx={{ typography: 'caption', color: 'text.disabled', ...sx }} {...other}>
      {createClientDate}

      {duration && (
        <>
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

          {duration}
        </>
      )}
    </Stack>
  );
}

PostTimeBlock.propTypes = {
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  duration: PropTypes.string,
  sx: PropTypes.object,
};
